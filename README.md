# expo-vite-webview

Fiddling with expo and vite.
Based on the idea from electron ecosystem e.g. https://github.com/hi-ogawa/electron-vite-experiment.

```sh
# development
npm run setup
npm run dev:client  # vite server for webview

# run on android emulator (prerequisite https://docs.expo.dev/workflow/android-studio-emulator/)
npm -C packages/expo run android:install
npm -C packages/expo run dev
```

![image](https://user-images.githubusercontent.com/4232207/192078396-fb4c6f52-0036-47d2-b71e-7e89aefb9702.png)

## todo

- [x] ipc
- [ ] debugging
  - [x] logging
  - [ ] remote inspector
- [ ] testing
- [x] manual build (no aes) (gradle)
- [ ] package and distributing app
  - standalone mode?
  - asset update?
  - build in docker/ci

## references

- https://github.com/hi-ogawa/electron-vite-experiment
- https://github.com/react-native-webview/react-native-webview/tree/master/docs
