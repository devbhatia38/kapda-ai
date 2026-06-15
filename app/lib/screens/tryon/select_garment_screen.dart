import 'dart:io';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../theme.dart';
import 'processing_screen.dart';

class SelectGarmentScreen extends StatefulWidget {
  final File? personImage;
  final bool useMannequin;

  const SelectGarmentScreen({super.key, this.personImage, required this.useMannequin});

  @override
  State<SelectGarmentScreen> createState() => _SelectGarmentScreenState();
}

class _SelectGarmentScreenState extends State<SelectGarmentScreen> {
  final _supabase = Supabase.instance.client;
  Map<String, dynamic>? _selectedGarment;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Step 2: Select Garment')),
      body: Column(
        children: [
          Expanded(
            child: FutureBuilder<List<Map<String, dynamic>>>(
              future: _supabase.from('garments').select('*'),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) return const Center(child: CircularProgressIndicator());
                if (!snapshot.hasData || snapshot.data!.isEmpty) return const Center(child: Text('No garments in catalog.'));

                final items = snapshot.data!;
                return GridView.builder(
                  padding: const EdgeInsets.all(16),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 0.8,
                  ),
                  itemCount: items.length,
                  itemBuilder: (context, i) {
                    final item = items[i];
                    final isSelected = _selectedGarment?['id'] == item['id'];
                    return InkWell(
                      onTap: () => setState(() => _selectedGarment = item),
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSelected ? AppTheme.primary : Colors.grey[300]!, width: isSelected ? 3 : 1),
                        ),
                        child: Column(
                          children: [
                            Expanded(
                              child: ClipRRect(
                                borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                                child: Image.network(item['image_url'], fit: BoxFit.cover, width: double.infinity),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(item['name'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12), maxLines: 1),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: ElevatedButton(
              onPressed: _selectedGarment == null
                  ? null
                  : () => Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => ProcessingScreen(
                            personImage: widget.personImage,
                            useMannequin: widget.useMannequin,
                            garment: _selectedGarment!,
                          ),
                        ),
                      ),
              child: const Text('Generate Try-On'),
            ),
          ),
        ],
      ),
    );
  }
}
