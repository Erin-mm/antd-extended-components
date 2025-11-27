// antd-extended-components/src/demo/main.tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import Demo from "./Demo";
import "antd/dist/antd.css"; // 导入 antd 样式

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <Demo />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
