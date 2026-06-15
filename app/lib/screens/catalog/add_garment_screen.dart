import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../theme.dart';

class AddGarmentScreen extends StatefulWidget {
  const AddGarmentScreen({super.key});

  @override
  State<AddGarmentScreen> createState() => _AddGarmentScreenState();
}

class _AddGarmentScreenState extends State<AddGarmentScreen> {
  final _nameController = TextEditingController();
  final _priceController = TextEditingController();
  String _selectedCategory = 'Sarees';
  File? _imageFile;
  bool _isUploading = false;

  final List<String> _categories = [
    'Sarees', 'Lehengas', 'Salwar Suits', 'Kurtis', 'Bridal Wear', 
    'Navratri Chaniya Choli', 'Sharara', 'Anarkali'
  ];

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: ImageSource.gallery);
    if (picked != null) {
      setState(() => _imageFile = File(picked.path));
    }
  }

  Future<void> _saveGarment() async {
    if (_imageFile == null || _nameController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please provide image and name')));
      return;
    }

    setState(() => _isUploading = true);
    try {
      final user = Supabase.instance.client.auth.currentUser;
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('http://YOUR_API_URL/garments'), // Update with actual API URL
      );
      
      request.fields['name'] = _nameController.text;
      request.fields['category'] = _selectedCategory;
      request.fields['retailer_id'] = user!.id;
      if (_priceController.text.isNotEmpty) {
        request.fields['price'] = _priceController.text;
      }
      
      request.files.add(await http.MultipartFile.fromPath('file', _imageFile!.path));
      
      final response = await request.send();
      if (response.statusCode == 200) {
        Navigator.pop(context);
      } else {
        throw Exception('Failed to upload');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
    } finally {
      setState(() => _isUploading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add New Garment')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            GestureDetector(
              onTap: _pickImage,
              child: Container(
                height: 250,
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey[300]!),
                ),
                child: _imageFile == null
                    ? const Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.add_a_photo, size: 50, color: AppTheme.primary),
                          SizedBox(height: 8),
                          Text('Upload Garment Photo'),
                        ],
                      )
                    : ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Image.file(_imageFile!, fit: BoxFit.cover),
                      ),
              ),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Garment Name', border: OutlineInputBorder()),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _selectedCategory,
              decoration: const InputDecoration(labelText: 'Category', border: OutlineInputBorder()),
              items: _categories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
              onChanged: (val) => setState(() => _selectedCategory = val!),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _priceController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Price (Optional)', border: OutlineInputBorder(), prefixText: '₹ '),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _isUploading ? null : _saveGarment,
              child: _isUploading 
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text('Save to Catalog'),
            ),
          ],
        ),
      ),
    );
  }
}
