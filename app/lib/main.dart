import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'theme.dart';
import 'providers/auth_provider.dart';
import 'screens/splash_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Supabase.initialize(
    url: 'https://kcbotgwapvdavzsiqdtx.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYm90Z3dhcHZkYXZ6c2lxZHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTAxMzgsImV4cCI6MjA5NzE2NjEzOH0.TEmJFlyKqO4hnXpa_cmiIZL3ssX3N-iW-FypmZrZgi4',
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: const KapdaAIApp(),
    ),
  );
}

class KapdaAIApp extends StatelessWidget {
  const KapdaAIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kapda AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const SplashScreen(),
    );
  }
}
