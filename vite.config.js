import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })],
  base: './', // 设置 base 为相对路径
})
