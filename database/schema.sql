-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- RETAILERS
CREATE TABLE retailers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    shop_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    plan TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GARMENTS
CREATE TABLE garments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    retailer_id UUID NOT NULL REFERENCES retailers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Sarees', 'Lehengas', 'Salwar Suits', 'Kurtis', 'Bridal Wear', 'Navratri Chaniya Choli', 'Sharara', 'Anarkali')),
    image_url TEXT NOT NULL,
    price DECIMAL(10, 2),
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CUSTOMERS
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    retailer_id UUID NOT NULL REFERENCES retailers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRYON SESSIONS
CREATE TABLE tryon_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    retailer_id UUID NOT NULL REFERENCES retailers(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRYON RESULTS
CREATE TABLE tryon_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES tryon_sessions(id) ON DELETE CASCADE,
    garment_id UUID REFERENCES garments(id) ON DELETE SET NULL,
    result_url TEXT NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USAGE LOGS
CREATE TABLE usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    retailer_id UUID NOT NULL REFERENCES retailers(id) ON DELETE CASCADE,
    usage_date DATE DEFAULT CURRENT_DATE,
    tryon_count INTEGER DEFAULT 0,
    UNIQUE(retailer_id, usage_date)
);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE garments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tryon_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tryon_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- Retailers can only see and edit their own profile
CREATE POLICY "Retailers can view own profile" ON retailers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Retailers can update own profile" ON retailers FOR UPDATE USING (auth.uid() = id);

-- Other tables: Filter by retailer_id
CREATE POLICY "Retailers can manage own garments" ON garments FOR ALL USING (auth.uid() = retailer_id);
CREATE POLICY "Retailers can manage own customers" ON customers FOR ALL USING (auth.uid() = retailer_id);
CREATE POLICY "Retailers can manage own sessions" ON tryon_sessions FOR ALL USING (auth.uid() = retailer_id);
CREATE POLICY "Retailers can manage own results" ON tryon_results FOR ALL 
USING (EXISTS (SELECT 1 FROM tryon_sessions WHERE tryon_sessions.id = tryon_results.session_id AND tryon_sessions.retailer_id = auth.uid()));
CREATE POLICY "Retailers can view own usage logs" ON usage_logs FOR SELECT USING (auth.uid() = retailer_id);

-- TRIGGER FOR NEW RETAILER ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.retailers (id, name, shop_name, email, phone, city, state)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'name', ''), 
    COALESCE(new.raw_user_meta_data->>'shop_name', ''), 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'city', ''),
    COALESCE(new.raw_user_meta_data->>'state', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
