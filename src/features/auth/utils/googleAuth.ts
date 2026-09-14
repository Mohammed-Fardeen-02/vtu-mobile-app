import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

// Ensure WebBrowser completed auth session redirects properly
WebBrowser.maybeCompleteAuthSession();

export const performGoogleSignInSession = async (): Promise<{ idToken: string | null; cancelled?: boolean }> => {
  const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID?.trim();

  // Check if Google Client ID is configured or still a placeholder
  const isInvalidClientId =
    !googleClientId ||
    googleClientId.includes('placeholder') ||
    googleClientId.includes('your_google_client_id');

  if (isInvalidClientId) {
    Alert.alert(
      'Google Client ID Required',
      'Google Sign-In requires a valid Web Client ID from Google Cloud Console.\n\nPlease set EXPO_PUBLIC_GOOGLE_CLIENT_ID in vtu-mobile-app/.env file.',
      [{ text: 'OK' }]
    );
    return { idToken: null, cancelled: true };
  }

  // Google OAuth Redirect URI registered in Google Cloud Console
  const googleRedirectUri =
    process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI?.trim() ||
    'http://localhost:8081';

  console.log('[Google OAuth Direct Redirect URI]:', googleRedirectUri);

  const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // OpenID Connect compliant Google OAuth URL with prompt=select_account & nonce
  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(googleClientId)}` +
    `&redirect_uri=${encodeURIComponent(googleRedirectUri)}` +
    `&response_type=id_token` +
    `&scope=${encodeURIComponent('openid email profile')}` +
    `&nonce=${encodeURIComponent(nonce)}` +
    `&prompt=select_account`;

  try {
    const res = await WebBrowser.openAuthSessionAsync(authUrl, googleRedirectUri);

    if (res.type === 'cancel' || res.type === 'dismiss') {
      return { idToken: null, cancelled: true };
    }

    if (res.type === 'success' && res.url) {
      const match = res.url.match(/id_token=([^&]+)/);
      if (match && match[1]) {
        return { idToken: match[1] };
      }
    }

    return { idToken: null, cancelled: true };
  } catch (err: any) {
    console.warn('[Google Auth Session Error]:', err);
    Alert.alert('Google Sign-In Error', err?.message || 'Failed to open Google authentication session.');
    return { idToken: null, cancelled: true };
  }
};


