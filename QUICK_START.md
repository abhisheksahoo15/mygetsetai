# ✨ AI CourseHub - Lightweight Edition

Your app is now optimized and running smoothly!

## ✅ What's Ready

- **Authentication**: Login & Signup with email/password
- **Courses**: Browse 3 courses (AI Mastery, Python Pro, ML Launchpad)
- **Payment**: Razorpay payment integration (₹1999-₹3999)
- **User Profiles**: Auto-save name and phone
- **Clean UI**: Fast, lightweight design

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Your `.env.local` already has your keys configured:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_***
RAZORPAY_KEY_SECRET=***
NEXT_PUBLIC_SUPABASE_URL=https://wmzwjysfazswzrizbcyp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_***
SUPABASE_SERVICE_ROLE_KEY=sb_secret_***
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 User Flow

1. **Home** → Browse courses
2. **Signup/Login** → Create account or login
3. **Course Details** → View course information
4. **Checkout** → Process payment with Razorpay
5. **Success** → Confirmation page

## 🔧 What Changed (Optimization)

✅ Removed heavy CSS effects (gradients, blur, shadows)
✅ Simplified Razorpay integration (loads on demand)
✅ Cleaned up API routes (better error handling)
✅ Optimized Supabase client usage
✅ Removed unnecessary animations
✅ Lightweight styling with Tailwind

## 🛠️ Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check code quality
```

## 📊 Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Authentication & Database
- **Razorpay** - Payment gateway

## ⚡ Performance Tips

- The app loads instantly (no heavy animations)
- API calls are optimized
- Images/emojis only (no icon libraries)
- Minimal CSS effects
- Dynamic script loading (Razorpay loads when needed)

## 🐛 Troubleshooting

**App not starting?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Payment not working?**
- Verify Razorpay keys in `.env.local`
- Check browser console for errors
- Make sure you're logged in before checkout

**Auth not working?**
- Verify Supabase URL and keys in `.env.local`
- Check if Supabase project is accessible

## 📧 Support

Everything is set up and ready to use!
- All dependencies are installed
- Environment variables are configured
- Database tables can be created from `supabase/schema.sql`

Happy coding! 🎉
