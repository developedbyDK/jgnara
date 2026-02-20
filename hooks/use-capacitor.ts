"use client";

import { useEffect } from "react";
import { isNativePlatform, getPlatform } from "@/lib/capacitor";
import {
  hideSplashScreen,
  setStatusBarStyle,
  setStatusBarBackgroundColor,
} from "@/lib/capacitor-plugins";

export function useCapacitor() {
  useEffect(() => {
    if (!isNativePlatform()) return;

    const init = async () => {
      // SplashScreen 숨기기
      await hideSplashScreen();

      // StatusBar 설정
      await setStatusBarStyle("Dark");
      if (getPlatform() === "android") {
        await setStatusBarBackgroundColor("#ffffff");
      }

      // Android 뒤로가기 버튼 처리
      if (getPlatform() === "android") {
        const { App } = await import("@capacitor/app");
        App.addListener("backButton", ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
      }

      // 딥링크 리스너
      const { App } = await import("@capacitor/app");
      App.addListener("appUrlOpen", ({ url }) => {
        const path = new URL(url).pathname;
        if (path) {
          window.location.href = path;
        }
      });
    };

    init();
  }, []);
}
