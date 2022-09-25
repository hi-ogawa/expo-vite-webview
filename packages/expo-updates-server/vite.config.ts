import rakkas from "rakkasjs/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    rakkas({
      adapter: process.env.CONFIG_RAKKAS_ADAPTER as any,
    }),
  ],
});
