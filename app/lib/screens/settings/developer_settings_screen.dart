import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../theme.dart';

class DeveloperSettingsScreen extends StatefulWidget {
  const DeveloperSettingsScreen({super.key});

  @override
  State<DeveloperSettingsScreen> createState() => _DeveloperSettingsScreenState();
}

class _DeveloperSettingsScreenState extends State<DeveloperSettingsScreen> {
  final _supabase = Supabase.instance.client;
  final _hfController = TextEditingController();
  final _r2AccountController = TextEditingController();
  final _r2KeyController = TextEditingController();
  final _r2SecretController = TextEditingController();
  final _r2BucketController = TextEditingController();
  bool _isLoading = true;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _loadKeys();
  }

  _loadKeys() async {
    final user = _supabase.auth.currentUser;
    final res = await _supabase.from('retailers').select('*').eq('id', user!.id).single();
    if (mounted) {
      setState(() {
        _hfController.text = res['hf_token'] ?? '';
        _r2AccountController.text = res['r2_account_id'] ?? '';
        _r2KeyController.text = res['r2_access_key'] ?? '';
        _r2SecretController.text = res['r2_secret_key'] ?? '';
        _r2BucketController.text = res['r2_bucket_name'] ?? '';
        _isLoading = false;
      });
    }
  }

  _saveKeys() async {
    setState(() => _isSaving = true);
    try {
      final user = _supabase.auth.currentUser;
      await _supabase.from('retailers').update({
        'hf_token': _hfController.text,
        'r2_account_id': _r2AccountController.text,
        'r2_access_key': _r2KeyController.text,
        'r2_secret_key': _r2SecretController.text,
        'r2_bucket_name': _r2BucketController.text,
      }).eq('id', user!.id);
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('API Keys Updated Successfully')));
    } finally {
      setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Developer Settings (BYOK)')),
      body: _isLoading 
        ? const Center(child: CircularProgressIndicator())
        : SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Bring Your Own Key (BYOK)',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.primary),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Enter your own API keys to eliminate usage limits and manage your own costs.',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                const SizedBox(height: 32),
                
                TextField(
                  controller: _hfController,
                  decoration: const InputDecoration(labelText: 'Hugging Face Token', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 24),
                
                const Text('Cloudflare R2 Storage', style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                TextField(
                  controller: _r2AccountController,
                  decoration: const InputDecoration(labelText: 'Account ID', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _r2KeyController,
                  decoration: const InputDecoration(labelText: 'Access Key ID', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _r2SecretController,
                  obscureText: true,
                  decoration: const InputDecoration(labelText: 'Secret Access Key', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _r2BucketController,
                  decoration: const InputDecoration(labelText: 'Bucket Name', border: OutlineInputBorder()),
                ),
                
                const SizedBox(height: 40),
                ElevatedButton(
                  onPressed: _isSaving ? null : _saveKeys,
                  child: _isSaving ? const CircularProgressIndicator(color: Colors.white) : const Text('Save API Configuration'),
                ),
              ],
            ),
          ),
    );
  }
}
