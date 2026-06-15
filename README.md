# Kapda AI - Virtual Try-On for Indian Traditional Wear

Kapda AI is a production-ready B2B SaaS platform designed for boutique retailers, wedding wear shops, and online fashion stores across India. It enables customers to virtually try on traditional Indian clothing using advanced AI (CatVTON).

## Project Structure

This is a monorepo containing:
- `/app`: Flutter Mobile Application (Android)
- `/web`: Marketing Website (Next.js 14)
- `/api`: Backend API Service (FastAPI)
- `/database`: Supabase SQL Schema scripts

## Tech Stack
- **Mobile:** Flutter (Dart)
- **Web:** Next.js 14 (TypeScript), Tailwind CSS, Framer Motion
- **Backend:** FastAPI (Python 3.10+)
- **Database/Auth:** Supabase (PostgreSQL)
- **Storage:** Cloudflare R2
- **AI Model:** CatVTON via RunPod Serverless

## Setup Instructions

### 1. Database Setup (Supabase)
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** and execute the contents of `database/schema.sql`.
3. Enable **Authentication** and configure Email/Password login.

### 2. Backend Setup (FastAPI)
1. `cd api`
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` from the root to `api/.env` and fill in:
   - Supabase credentials
   - Cloudflare R2 credentials (S3-compatible)
   - RunPod API Key and Endpoint ID
6. Start the server: `uvicorn main:app --reload`

### 3. Marketing Website (Next.js)
1. `cd web`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. The website will be available at `http://localhost:3000`.

### 4. Mobile App (Flutter)
1. `cd app`
2. Ensure you have the Flutter SDK installed.
3. Install dependencies: `flutter pub get`
4. Update `lib/main.dart` with your Supabase URL and Anon Key.
5. Update `lib/screens/catalog/add_garment_screen.dart` and `lib/screens/tryon/processing_screen.dart` with your Backend API URL.
6. Run the app: `flutter run`
7. Build APK: `flutter build apk --release`

## Key Features
- **AI Try-On:** Realistic virtual try-ons for Sarees, Lehengas, and more.
- **Multilingual:** Support for Hindi, English, and Gujarati.
- **Catalog Management:** Digitally manage your boutique's inventory.
- **Retailer Analytics:** Track try-on counts and trending garments.
- **Customer CRM:** Save customer photos and try-on history.

## License
Proprietary - Kapda AI 2026
