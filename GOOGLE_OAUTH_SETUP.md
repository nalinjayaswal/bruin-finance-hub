# Google OAuth Redirect URI Fix

## ❌ **The Problem:**
You're getting `Error 400: redirect_uri_mismatch` because the redirect URIs in your Google Cloud Console don't match what the app is sending.

## ✅ **The Solution:**

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/apis/credentials

### 2. Click on your OAuth 2.0 Client ID
Find the client ID: `987378120964-2p00b5046kl6lotkqhr2cevo0kq6jken.apps.googleusercontent.com`

### 3. Add BOTH Redirect URIs:

**For localhost (development):**
```
http://localhost:3000/api/oauth/google/callback
```

**For Vercel (production):**
```
https://deepnative.vercel.app/api/oauth/google/callback
```

### 4. Save Changes

Click "Save" at the bottom of the page.

---

## 🔍 **Current Configuration:**

Your app is configured to use:
- **Development:** `http://localhost:3000/api/oauth/google/callback`
- **Production:** `https://deepnative.vercel.app/api/oauth/google/callback`

Make sure BOTH are added to your Google OAuth Client's "Authorized redirect URIs" list.

---

## 🧪 **Testing:**

After adding the URIs:
1. Wait 1-2 minutes for Google to propagate the changes
2. Try connecting Google again from `/integrations`
3. You should now be redirected to Google's consent screen successfully

---

## 📝 **Note:**

I've also fixed the code to handle trailing slashes in `NEXT_PUBLIC_APP_URL`, so it will work correctly even if you have:
- `https://deepnative.vercel.app` (no slash)
- `https://deepnative.vercel.app/` (with slash)


