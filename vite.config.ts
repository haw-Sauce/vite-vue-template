import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(`当前环境: ${mode}`, env.VITE_BASE_URL)
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        dts: 'src/types/auto-imports.d.ts', // 自动生成的类型声明文件路径
        imports: ['vue', 'vue-router', 'pinia'], // 自动导入的模块
        eslintrc: { enabled: true },
        vueTemplate: true, // default false
        resolvers: [ElementPlusResolver()], // 使用 Element Plus 的解析器
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 设置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
      },
    },
  })
}
