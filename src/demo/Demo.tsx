// src/demo/Demo.tsx

import React from "react";
import { Layout, Menu } from "antd";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import InfiniteSelectDemo from "./InfiniteSelectDemo";
import FloatButtonDemo from "./FloatButtonDemo";

const { Header, Content, Sider } = Layout;

// 路由配置组件
const RouteConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/select" element={<InfiniteSelectDemo />} />
      <Route path="/floatbutton" element={<FloatButtonDemo />} />
      <Route path="/" element={<Navigate to="/select" replace />} />
    </Routes>
  );
};

const Demo: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 组件菜单项
  const menuItems = [
    {
      key: "/select",
      label: <Link to="/select">InfiniteSelect</Link>,
    },
    {
      key: "/floatbutton",
      label: <Link to="/floatbutton">FloatButton</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff" }}>Antd Extended Components Demo</Header>
      <Layout>
        {/* 左侧菜单栏 (Sider) */}
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            selectedKeys={[currentPath]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        {/* 右侧内容 (Content) */}
        <Layout style={{ padding: "0 12px 12px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {/* 渲染路由组件 */}
            <RouteConfig />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Demo;
