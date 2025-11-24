// src/demo/Demo.tsx

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import InfiniteSelectDemo from './InfiniteSelectDemo'; // 假设您将 InfiniteSelect 的示例移到这里
import FloatButtonDemo from './FloatButtonDemo'; // 【新增】FloatButton 示例文件

const { Header, Content, Sider } = Layout;

// 组件菜单项
const menuItems = [
  { key: 'select', label: 'InfiniteSelect' },
  { key: 'floatbutton', label: 'FloatButton' },
];

// 路由映射：key 对应要渲染的组件
const routeMap = {
  select: <InfiniteSelectDemo />,
  floatbutton: <FloatButtonDemo />,
};

const Demo: React.FC = () => {
  const [currentKey, setCurrentKey] = useState('select');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff' }}>Antd Extended Components Demo</Header>
      <Layout>
        {/* 左侧菜单栏 (Sider) */}
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[currentKey]}
            onClick={(e) => setCurrentKey(e.key)}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        {/* 右侧内容 (Content) */}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            {/* 渲染当前选中的组件示例 */}
            {routeMap[currentKey as keyof typeof routeMap]}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Demo;