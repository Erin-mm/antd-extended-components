# 🚀 antd-extended-components / InfiniteSelect

[![npm version](https://img.shields.io/npm/v/antd-extended-components.svg)](https://www.npmjs.com/package/antd-extended-components)

[![GitHub Pages](https://github.com/Erin-mm/antd-extended-components/actions/workflows/pages/pages-build-deployment/badge.svg)](https://Erin-mm.github.io/antd-extended-components/)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

一个基于 Ant Design React V4 开发的扩展组件库，专注于提供高性能、高可定制性的增强型 UI 组件。

目前包含两个组件：**无限滚动 Select（InfiniteSelect）** 和 **悬浮按钮 FloatButton**。

## ✨ 特性

- **Ant Design 兼容：** 完全基于 Ant Design V4 `Select` 组件，继承其所有原生功能（如 `showSearch`, `allowClear` 等）。

- **高性能分页：** 通过 Antd `onPopupScroll` 实现列表下拉触底自动加载，无缝衔接后端分页接口。

- **状态封装：** 内部封装了分页逻辑 (`page`)，使用者只需关注数据加载函数。

## 📦 安装

```bash

# 使用 pnpm (推荐)

pnpm add antd-extended-components



# 或使用 npm

npm install antd-extended-components
```

## ⚠️ Peer Dependencies (对等依赖)

本组件依赖于 Ant Design V4，请确保您的项目中已安装以下依赖：

```bash
pnpm install react react-dom antd@^4.0.0
```

🖥️ 在线演示

查看 [GitHub Pages 演示页面](https://erin-mm.github.io/antd-extended-components/) 获取完整示例和效果展示。

📝 许可证

本项目使用 MIT 许可证 授权。详情请见 LICENSE 文件。
