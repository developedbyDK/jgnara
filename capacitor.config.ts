import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.joonggi.app",
  appName: "중기나라",
  webDir: "out",
  server: {
    url: process.env.NEXT_PUBLIC_APP_URL || "https://joonggiin.com",
    cleartext: false,
    allowNavigation: [
      "joonggiin.com",
      "*.joonggiin.com",
      "*.supabase.co",
      "*.kakao.com",
      "*.google.com",
      "*.googleapis.com",
      "*.tosspayments.com",
    ],
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#ffffff",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#ffffff",
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  ios: {
    contentInset: "always",
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
};

export default config;
