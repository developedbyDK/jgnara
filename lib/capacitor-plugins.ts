import { isNativePlatform, isPluginAvailable } from "./capacitor";

export async function hideSplashScreen() {
  if (!isNativePlatform() || !isPluginAvailable("SplashScreen")) return;
  const { SplashScreen } = await import("@capacitor/splash-screen");
  await SplashScreen.hide({ fadeOutDuration: 300 });
}

export async function setStatusBarStyle(style: "Dark" | "Light") {
  if (!isNativePlatform() || !isPluginAvailable("StatusBar")) return;
  const { StatusBar, Style } = await import("@capacitor/status-bar");
  await StatusBar.setStyle({
    style: style === "Dark" ? Style.Dark : Style.Light,
  });
}

export async function setStatusBarBackgroundColor(color: string) {
  if (!isNativePlatform() || !isPluginAvailable("StatusBar")) return;
  const { StatusBar } = await import("@capacitor/status-bar");
  await StatusBar.setBackgroundColor({ color });
}

export async function registerPushNotifications() {
  if (!isNativePlatform() || !isPluginAvailable("PushNotifications")) return;
  const { PushNotifications } = await import(
    "@capacitor/push-notifications"
  );
  const permission = await PushNotifications.requestPermissions();
  if (permission.receive === "granted") {
    await PushNotifications.register();
  }
  return permission;
}

export async function triggerHaptics(type: "light" | "medium" | "heavy" = "medium") {
  if (!isNativePlatform() || !isPluginAvailable("Haptics")) return;
  const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
  const styleMap = {
    light: ImpactStyle.Light,
    medium: ImpactStyle.Medium,
    heavy: ImpactStyle.Heavy,
  };
  await Haptics.impact({ style: styleMap[type] });
}
