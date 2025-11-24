# 更新日志

所有对项目的重要修改都将记录在此文件中。

本项目遵循 [Semantic Versioning (语义化版本)](https://semver.org/lang/zh-CN/) 规范。

## [1.0.0] - 2025-11-20

### 🚀 新功能

* 首次发布组件库 `antd-extended-components`。
* 新增核心组件 `InfiniteSelect`，支持 Ant Design V4 `Select` 的下拉触底无限加载功能。

### 🔨 改进

* 基于 Vite + TypeScript 构建，支持 ES Module 和 UMD 格式。
* 内部抽象了分页加载状态（`loading`）和滚动事件监听（`onPopupScroll`）。

### 📝 文档

* 添加 `README.md`，包含安装指南和基础用法示例。
* 添加 `LICENSE` (MIT) 和 `.gitignore` 文件。