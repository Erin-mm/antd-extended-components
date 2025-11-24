
# 🚀 antd-extended-components / InfiniteSelect

  

[![npm version](https://img.shields.io/npm/v/antd-extended-components.svg)](https://www.npmjs.com/package/antd-extended-components)

[![GitHub Pages](https://github.com/Erin-mm/antd-extended-components/actions/workflows/pages/pages-build-deployment/badge.svg)](https://Erin-mm.github.io/antd-extended-components/)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

  

一个基于 Ant Design React V4 开发的扩展组件库，专注于提供高性能、高可定制性的增强型 UI 组件。

  

目前包含第一个组件：**无限滚动 Select（InfiniteSelect）**。

  

## ✨ 特性

  

* **Ant Design 兼容：** 完全基于 Ant Design V4 `Select` 组件，继承其所有原生功能（如 `showSearch`, `allowClear` 等）。

* **高性能分页：** 通过 Antd `onPopupScroll` 实现列表下拉触底自动加载，无缝衔接后端分页接口。

* **状态封装：** 内部封装了分页逻辑 (`page`)，使用者只需关注数据加载函数。

  

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


## 📄 基础用法示例 (Basic Usage)

以下是如何使用 InfiniteSelect 的最简化示例。我们展示了如何使用 initialLoading 来处理首次数据加载，并用 loadMoreOptions 处理分页。

  

```ts

import React, { useState, useEffect } from 'react';

import { InfiniteSelect } from 'antd-extended-components';

import { SelectProps } from 'antd';

  

// 1. 模拟后端接口：根据页码加载数据

const fetchRemoteOptions = async (page: number): Promise<SelectProps['options']> => {

return new Promise((resolve) => {

setTimeout(() => {

const pageSize = 20;

const start = (page - 1) * pageSize;

// 假设总共 100 条数据，当超过 100 条时，返回空数组表示结束

if (start >= 100) {

resolve([]);

return;

}

  

const mockData = Array.from({ length: pageSize }, (_, i) => ({

label: `用户选项 ${start + i + 1}`,

value: `user-${start + i + 1}`,

}));

resolve(mockData);

}, 500); // 模拟 500ms 网络延迟

});

};

  

const UserSelection = () => {

const [selectedValue, setSelectedValue] = useState(undefined);

const [initialLoading, setInitialLoading] = useState(true);

const [initialData, setInitialData] = useState([]);

  

// 首次挂载时，加载第一页数据

useEffect(() => {

fetchRemoteOptions(1).then(data => {

setInitialData(data);

}).finally(() => {

setInitialLoading(false); // 初始加载完成

});

}, []);

return (

<InfiniteSelect

style={{ width: 300 }}

placeholder="选择一个用户..."

// 传入第一页的初始数据 (加载完成后传入)

options={initialData}

// 【演示 initialLoading 用法】控制首次加载时的 Select 状态

initialLoading={initialLoading}

// 【核心属性】处理分页加载的函数 (用于 page=2, 3, 4...)

loadMoreOptions={fetchRemoteOptions}

// 其他 Antd Select 属性

onChange={setSelectedValue}

value={selectedValue}

showSearch

/>

);

};

  

export default UserSelection;

```


## 核心 API (Props)

InfiniteSelect 继承了 Ant Design Select 的所有属性，并增加了以下核心扩展属性：

|**Prop**|**类型**|**默认值**|**描述**|
|---|---|---|---|
|`loadMoreOptions`|`(page: number) => Promise<OptionType[]>`|必传|**【核心】** 异步加载更多选项的回调函数。接收将要加载的页码 `page`，必须返回一个包含新选项的 Promise。返回空数组时，组件将自动停止加载。|
|`initialLoading`|`boolean`|`false`|**【可选】** 外部控制的加载状态。常用于**首次挂载时的初始数据请求**或**搜索请求**。它会显示在 Select 组件的主体部分。|
|`initialPage`|`number`|`1`|**【可选】** 初始页码。如果您的后端 API 页码从 0 开始，请设置为 0。|


🖥️ 在线演示

查看 [GitHub Pages 演示页面](https://erin-mm.github.io/antd-extended-components/) 获取完整示例和效果展示。


📝 许可证

本项目使用 MIT 许可证 授权。详情请见 LICENSE 文件。