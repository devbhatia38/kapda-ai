import 'package:flutter/material.dart';
import '../../theme.dart';

class PhotographyGuideScreen extends StatelessWidget {
  const PhotographyGuideScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Guide: Best AI Results')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'How to take a "Mostly Correct" photo:',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.primary),
            ),
            const SizedBox(height: 24),
            _buildTip(
              '1. Standing Pose',
              'The person should stand straight with arms slightly away from the body.',
              Icons.accessibility_new,
            ),
            _buildTip(
              '2. Neutral Background',
              'Use a plain, light-colored wall. Avoid busy patterns or other people.',
              Icons.wallpaper,
            ),
            _buildTip(
              '3. Good Lighting',
              'Ensure the person is well-lit from the front. Avoid harsh shadows.',
              Icons.lightbulb_outline,
            ),
            _buildTip(
              '4. Full Body or Waist Up',
              'The AI works best when the entire garment area is visible and clear.',
              Icons.camera_alt_outlined,
            ),
            const SizedBox(height: 40),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.green.withOpacity(0.1),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.green.withOpacity(0.3)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.check_circle, color: Colors.green),
                  SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      'Following these tips ensures the AI puts the clothes on correctly every time.',
                      style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Got it, let\'s try!'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTip(String title, String desc, IconData icon) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            backgroundColor: AppTheme.primary.withOpacity(0.1),
            child: Icon(icon, color: AppTheme.primary),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 4),
                Text(desc, style: TextStyle(color: Colors.grey[600], fontSize: 14)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
