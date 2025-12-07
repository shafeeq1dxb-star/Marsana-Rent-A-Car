# Admin Page Setup Guide

## How to Access Admin Page

**URL:** `https://marsanarentacar.online/admin` (or `your-domain.com/admin`)

## Default Login Credentials

**Username:** `admin`  
**Password:** `marsana2024`

## How to Change Admin Credentials

### Option 1: Using Environment Variables (Recommended)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add these variables:
   ```
   NEXT_PUBLIC_ADMIN_USERNAME=your-username
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
   ```

3. **Redeploy** your project (Vercel will auto-redeploy)

### Option 2: Change in Code

Edit `app/admin/page.tsx` and change these lines:
```typescript
const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin"
const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "marsana2024"
```

## Features

- ✅ Password protected login
- ✅ View all booking submissions
- ✅ Export submissions to CSV
- ✅ Refresh to get latest submissions
- ✅ Language switcher (English/Arabic)
- ✅ Responsive design

## Security Note

⚠️ **Important:** Change the default password immediately after first login!

The admin page uses session storage for authentication. For production, consider adding:
- More secure authentication (JWT tokens)
- Database-backed user management
- Rate limiting
- IP whitelisting

