import Constants from "expo-constants";
import React from "react";
import { Button, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export function App() {
  const refWebView = React.useRef<WebView>(null);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#eee",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 8 }}>Hello Expo</Text>
        <Button
          title="click-expo"
          onPress={() => {
            refWebView.current?.injectJavaScript(
              `window.alert("expo to vite");`
            );
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <WebView
          ref={refWebView}
          source={{ uri: WEB_VIEW_URI }}
          onMessage={(e) => {
            console.log(e.nativeEvent.data);
            refWebView.current?.injectJavaScript(`
              window.alert("vite to expo to vite");
            `);
          }}
        />
      </View>
    </View>
  );
}

function getWebViewUri(): string {
  if (Constants.manifest?.packagerOpts?.dev) {
    const port = Constants.expoConfig?.extra?.["DEV_WEB_VIEW_PORT"];
    if (!port) {
      throw new Error("DEV_WEB_VIEW_PORT is not defined");
    }
    if (!Constants.manifest.hostUri) {
      throw new Error("hostUri is not defined");
    }
    let [host] = Constants.manifest.hostUri.split(":");
    return "http://" + host + ":" + port;
  }

  // how to access bundled client assets?
  throw new Error("TODO");
}

const WEB_VIEW_URI = getWebViewUri();
