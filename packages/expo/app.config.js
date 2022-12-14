/** @type {import("@expo/config-types/build/ExpoConfig").ExpoConfig} */
const EXPO_CONFIG = {
  name: "expo-vite-webview",
  version: "0.0.0",
  extra: {
    // TODO: switch by environment variable
    DEV_WEB_VIEW_PORT: "18182",
    CLIENT_VERSION: "0.0.0-pre.0",
  },
  platforms: ["android"],
  android: {
    package: "dev.hiro18181.expo_vite_webview",
  },
};

module.exports = {
  expo: EXPO_CONFIG,
};
