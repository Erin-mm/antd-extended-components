// antd-extended-components/src/demo/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import Demo from "./Demo";
import "antd/dist/antd.css"; // 导入 antd 样式

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
