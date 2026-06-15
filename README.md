# Kapda AI - Virtual Try-On for Indian Traditional Wear

Kapda AI is a production-ready B2B SaaS platform designed for boutique retailers, wedding wear shops, and online fashion stores across India. It enables customers to virtually try on traditional Indian clothing using advanced AI.

## Project Structure

This is a monorepo containing:
- `/app`: Flutter Mobile Application (Android)
- `/web`: Marketing Website (Next.js 14)
- `/api`: Backend API Service (FastAPI)
- `/database`: Supabase SQL Schema scripts

## Tech Stack
- **Mobile:** Flutter (Dart)
- **Web:** Next.js 14, Tailwind CSS, shadcn/ui
- **Backend:** FastAPI (Python)
- **Database/Auth:** Supabase
- **Storage:** Cloudflare R2
- **AI Model:** CatVTON via RunPod Serverless

## Setup Instructions

### Prerequisites
- Flutter SDK (stable)
- Node.js (v18+) & npm/pnpm
- Python 3.10+
- Supabase Account
- Cloudflare R2 Account
- RunPod API Key

### Installation
1. Clone the repository.
2. Follow individual READMEs in `/app`, `/web`, and `/api`.

### Database Setup
Execute the SQL scripts found in `/database` in your Supabase SQL Editor.

## License
Proprietary - Kapda AI 2026
