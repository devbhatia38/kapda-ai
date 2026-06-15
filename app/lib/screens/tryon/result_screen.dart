import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../theme.dart';

class ResultScreen extends StatelessWidget {
  final String resultUrl;

  const ResultScreen({super.key, required this.resultUrl});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Try-On Result'),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.share, color: AppTheme.primary)),
          IconButton(onPressed: () {}, icon: const Icon(Icons.download, color: AppTheme.primary)),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(24),
                child: CachedNetworkImage(
                  imageUrl: resultUrl,
                  placeholder: (context, url) => const Center(child: CircularProgressIndicator()),
                  errorWidget: (context, url, error) => const Icon(Icons.error),
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(32.0),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Try Another'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.whatsapp),
                    label: const Text('Share to WhatsApp'),
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF25D366)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
