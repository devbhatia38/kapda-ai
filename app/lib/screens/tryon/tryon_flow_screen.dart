import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../theme.dart';
import 'select_garment_screen.dart';

class TryOnFlowScreen extends StatefulWidget {
  const TryOnFlowScreen({super.key});

  @override
  State<TryOnFlowScreen> createState() => _TryOnFlowScreenState();
}

class _TryOnFlowScreenState extends State<TryOnFlowScreen> {
  File? _personImage;
  bool _useMannequin = false;

  Future<void> _pickImage(ImageSource source) async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: source);
    if (picked != null) {
      setState(() {
        _personImage = File(picked.path);
        _useMannequin = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Step 1: Person Photo')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.grey[300]!),
                ),
                child: _useMannequin
                    ? const Center(child: Text('Using Default Mannequin', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)))
                    : _personImage == null
                        ? const Center(child: Icon(Icons.person, size: 100, color: Colors.grey))
                        : ClipRRect(
                            borderRadius: BorderRadius.circular(24),
                            child: Image.file(_personImage!, fit: BoxFit.cover),
                          ),
              ),
            ),
            const SizedBox(height: 32),
            const Text('How would you like to start?', textAlign: TextAlign.center, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            const SizedBox(height: 24),
            Row(
              children: [
                _buildOptionCard(Icons.camera_alt, 'Camera', () => _pickImage(ImageSource.camera)),
                const SizedBox(width: 16),
                _buildOptionCard(Icons.photo_library, 'Gallery', () => _pickImage(ImageSource.gallery)),
              ],
            ),
            const SizedBox(height: 16),
            _buildOptionCard(Icons.accessibility_new, 'Use Default Mannequin', () {
              setState(() {
                _useMannequin = true;
                _personImage = null;
              });
            }, fullWidth: true),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: (_personImage == null && !_useMannequin)
                  ? null
                  : () => Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => SelectGarmentScreen(
                            personImage: _personImage,
                            useMannequin: _useMannequin,
                          ),
                        ),
                      ),
              child: const Text('Next: Select Garment'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionCard(IconData icon, String label, VoidCallback onTap, {bool fullWidth = false}) {
    return Expanded(
      flex: fullWidth ? 0 : 1,
      child: InkWell(
        onTap: onTap,
        child: Container(
          width: fullWidth ? double.infinity : null,
          padding: const EdgeInsets.symmetric(vertical: 16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppTheme.primary.withOpacity(0.1)),
          ),
          child: Column(
            children: [
              Icon(icon, color: AppTheme.primary),
              const SizedBox(height: 8),
              Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
            ],
          ),
        ),
      ),
    );
  }
}
