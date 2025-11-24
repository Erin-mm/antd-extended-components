// antd-extended-components/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  // 定义一个常量，判断当前是否在构建库 (即 pnpm run build)
  const isLibraryBuild = mode === "lib";
  return {
    // 基础路径设置：仅在构建演示页面时使用仓库名作为 base path
    base: "./",
    plugins: [
      react(),
      // 只有在构建库时才生成 d.ts 文件
      isLibraryBuild &&
        dts({
          insertTypesEntry: true,
        }),
    ],
    build: {
      // 开启库模式
      outDir: isLibraryBuild ? "dist" : "docs",
      emptyOutDir: true, // 每次构建前清空输出目录
      rollupOptions: {
        // 确保外部化那些不想打包进库的依赖
        // 外部化依赖：在库模式下，将 react/antd 排除在外
        external: isLibraryBuild ? ["react", "react-dom", "antd"] : [],
        // 明确指定入口文件
        input: isLibraryBuild
          ? resolve(__dirname, "src/index.ts")
          : {
              // 🚨 使用对象写法，并为 HTML 文件指定一个别名 'index'
              index: resolve(__dirname, "/index.html"),
            },
        // 🚨 关键修正：确保在演示模式下，HTML 文件名保持不变（通常不需要，但以防万一）
        output: isLibraryBuild
          ? {
              // 库模式的输出命名规则
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                antd: "antd",
              },
            }
          : {
              // 演示模式的输出规则：确保资源文件在 docs/assets 下
              entryFileNames: `assets/[name].[hash].js`,
              chunkFileNames: `assets/[name].[hash].js`,
              assetFileNames: `assets/[name].[hash].[ext]`,
            },
        // 库模式特有配置
        lib: isLibraryBuild
          ? {
              entry: resolve(__dirname, "src/index.ts"),
              name: "AntdExtendedComponents",
              formats: ["es", "umd"],
              fileName: (format) => `index.${format}.js`,
            }
          : undefined, // 演示模式下禁用 lib 配置
      },
      // 解决 Ant Design 样式路径问题 (如果需要)
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
    },
  };
});
