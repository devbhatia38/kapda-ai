import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthProvider extends ChangeNotifier {
  final _supabase = Supabase.instance.client;
  User? _user;
  bool _isLoading = false;
  String? _pendingPhoneNumber;

  User? _retailerProfile;

  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;
  
  Map<String, dynamic>? get retailerData => _supabase.auth.currentUser?.userMetadata;

  AuthProvider() {
    _user = _supabase.auth.currentUser;
    _supabase.auth.onAuthStateChange.listen((data) {
      _user = data.session?.user;
      notifyListeners();
    });
  }

  // Google Sign In
  Future<void> signInWithGoogle() async {
    _isLoading = true;
    notifyListeners();
    try {
      const webClientId = 'YOUR_WEB_CLIENT_ID'; // Required for web
      const iosClientId = 'YOUR_IOS_CLIENT_ID'; // Required for iOS

      final GoogleSignIn googleSignIn = GoogleSignIn(
        clientId: iosClientId,
        serverClientId: webClientId,
      );
      final googleUser = await googleSignIn.signIn();
      final googleAuth = await googleUser!.authentication;
      final accessToken = googleAuth.accessToken;
      final idToken = googleAuth.idToken;

      if (accessToken == null) throw 'No Access Token found.';
      if (idToken == null) throw 'No ID Token found.';

      await _supabase.auth.signInWithIdToken(
        provider: OAuthProvider.google,
        idToken: idToken,
        accessToken: accessToken,
      );
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Phone Auth Step 1: Send OTP
  Future<void> sendOtp(String phone) async {
    _isLoading = true;
    _pendingPhoneNumber = phone;
    notifyListeners();
    try {
      await _supabase.auth.signInWithOtp(phone: phone);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Phone Auth Step 2: Verify OTP
  Future<void> verifyOtp(String otp) async {
    _isLoading = true;
    notifyListeners();
    try {
      await _supabase.auth.verifyOTP(
        phone: _pendingPhoneNumber!,
        token: otp,
        type: OtpType.sms,
      );
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    await _supabase.auth.signOut();
  }
}
