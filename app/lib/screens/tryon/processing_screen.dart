import 'dart:io';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:http/http.dart' as http;
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../theme.dart';
import 'result_screen.dart';

class ProcessingScreen extends StatefulWidget {
  final File? personImage;
  final bool useMannequin;
  final Map<String, dynamic> garment;

  const ProcessingScreen({super.key, this.personImage, required this.useMannequin, required this.garment});

  @override
  State<ProcessingScreen> createState() => _ProcessingScreenState();
}

class _ProcessingScreenState extends State<ProcessingScreen> {
  @override
  void initState() {
    super.initState();
    _startTryOn();
  }

  Future<void> _startTryOn() async {
    try {
      final user = Supabase.instance.client.auth.currentUser;
      
      // 1. Upload person image if not mannequin
      String personUrl = widget.useMannequin ? 'DEFAULT_MANNEQUIN_URL' : '';
      if (!widget.useMannequin && widget.personImage != null) {
         // Logic to upload person image to R2 via API or directly to Supabase storage
         // For now, let's assume we send the file to the backend
      }

      // 2. Trigger API
      final response = await http.post(
        Uri.parse('http://YOUR_API_URL/tryon'),
        body: jsonEncode({
          'retailer_id': user!.id,
          'garment_id': widget.garment['id'],
          'person_image_url': personUrl,
        }),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final jobId = data['job_id'];
        final sessionId = data['session_id'];
        _pollStatus(jobId, sessionId);
      } else {
        throw Exception('Failed to start');
      }
    } catch (e) {
      if (mounted) Navigator.pop(context);
    }
  }

  Future<void> _pollStatus(String jobId, String sessionId) async {
    while (true) {
      await Future.delayed(const Duration(seconds: 3));
      if (!mounted) return;

      final res = await http.get(Uri.parse('http://YOUR_API_URL/tryon/status/$jobId?session_id=$sessionId&garment_id=${widget.garment['id']}'));
      if (res.statusCode == 200) {
        final status = jsonDecode(res.body);
        if (status['status'] == 'COMPLETED') {
          if (mounted) {
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(
                builder: (_) => ResultScreen(resultUrl: status['output']),
              ),
            );
          }
          break;
        } else if (status['status'] == 'FAILED') {
          if (mounted) Navigator.pop(context);
          break;
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primary,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SpinKitDoubleBounce(color: Colors.white, size: 80.0),
            const SizedBox(height: 32),
            const Text(
              'Designing your look...',
              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Text(
              'Our AI is weaving its magic.',
              style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }
}
