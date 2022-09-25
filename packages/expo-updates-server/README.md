# expo-updates-server

expo-updates api server based on [rakkasjs](https://github.com/rakkasjs/rakkasjs)

```sh
# development
npm run generate-manifest
npm run dev
curl -H 'expo-platform: android' -H 'expo-runtime-version: 0.0.0' http://127.0.0.1:3000/manifest

# production
npm run build
npm run deploy
curl -H 'expo-platform: android' -H 'expo-runtime-version: 0.0.0' https://expo-vite-webview-updates.vercel.app/manifest

# initial vercel cli setup
vercel --version # Vercel CLI 25.2.3
vercel projects add expo-vite-webview-updates
vercel link -p expo-vite-webview-updates
```
