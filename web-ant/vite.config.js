import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    // disableHostCheck: true,
    https: false,
    // hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:3001", // 你请求的第三方接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  optimizeDeps: {
    include: ["element-plus"],
  },
});
