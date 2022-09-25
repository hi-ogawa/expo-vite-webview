# expo-vite-webview

Fiddling with expo and vite.
Based on the idea from electron ecosystem e.g. https://github.com/hi-ogawa/electron-vite-experiment.

```sh
# install dependencies
npm run setup

# run vite server for webview
npm -C packages/client run dev

# run on android emulator (prerequisite https://docs.expo.dev/workflow/android-studio-emulator/)
npm -C packages/expo run android:install
npm -C packages/expo run dev

# deploy production assets for webview
npm -C packages/client run build
npm -C packages/client run deploy

# run release build
npm -C packages/expo run android:install:release

# deploy expo-updates
npm -C packages/expo run updates:build
npm -C packages/expo run updates:deploy
npm -C packages/expo-updates-server run generate-manifest
npm -C packages/expo-updates-server run build
npm -C packages/expo-updates-server run deploy
```

![image](https://user-images.githubusercontent.com/4232207/192078396-fb4c6f52-0036-47d2-b71e-7e89aefb9702.png)

## todo

- [x] ipc
- [ ] debugging
  - [x] logging
  - [ ] remote inspector
- [ ] testing
- [x] build without eas
- [ ] update without eas
- [ ] distributing app

## references

- https://github.com/hi-ogawa/electron-vite-experiment
- https://github.com/react-native-webview/react-native-webview/tree/master/docs
