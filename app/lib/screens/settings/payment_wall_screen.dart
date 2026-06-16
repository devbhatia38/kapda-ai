import 'package:flutter/material.dart';
import '../../theme.dart';

class PaymentWallScreen extends StatelessWidget {
  const PaymentWallScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 40),
              const Icon(Icons.lock_outline, size: 80, color: AppTheme.primary),
              const SizedBox(height: 24),
              const Text(
                'Complete Your Setup',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: AppTheme.primary),
              ),
              const SizedBox(height: 12),
              const Text(
                'Please select a plan and complete the payment to start using your AI Business Portal.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 48),
              
              _buildTierCard(
                context,
                'Monthly Subscription',
                '₹2,999 / month',
                'Perfect for small boutiques starting out.',
                Icons.calendar_month,
              ),
              const SizedBox(height: 16),
              _buildTierCard(
                context,
                'Lifetime Whitelabel',
                '₹49,999 once',
                'Custom branding, your own domain, and no monthly fees.',
                Icons.star,
                isPopular: true,
              ),
              
              const Spacer(),
              const Text(
                'Payment Instructions',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey[200]!),
                ),
                child: const Column(
                  children: [
                    Text('Scan QR or Pay to: +91 98765 43210 (UPI)'),
                    SizedBox(height: 4),
                    Text('After payment, click the button below.', style: TextStyle(fontSize: 10, color: Colors.grey)),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Payment notification sent. We will verify and activate your account shortly.')),
                  );
                },
                child: const Text('I Have Paid'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTierCard(BuildContext context, String title, String price, String desc, IconData icon, {bool isPopular = false}) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isPopular ? AppTheme.accent : Colors.grey[200]!, width: 2),
        boxShadow: [if (isPopular) BoxShadow(color: AppTheme.accent.withOpacity(0.1), blurRadius: 10)],
      ),
      child: Row(
        children: [
          Icon(icon, color: isPopular ? AppTheme.accent : AppTheme.primary, size: 32),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(price, style: const TextStyle(color: AppTheme.accent, fontWeight: FontWeight.bold)),
                Text(desc, style: const TextStyle(fontSize: 10, color: Colors.grey)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
