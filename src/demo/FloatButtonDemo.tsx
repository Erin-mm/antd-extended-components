// src/demo/FloatButtonDemo.tsx (新增)

import React from "react";
import { FloatButton } from "../components/FloatButton";
import { Card, Space, Popover } from "antd";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const FloatButtonDemo: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <h2>FloatButton 浮动按钮示例</h2>

      <Card title="基础用法和形状">
        <Space>
          <FloatButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => alert("Clicked!")}
          />
          <FloatButton
            shape="square"
            type="default"
            icon={<ShoppingCartOutlined />}
            size="large"
          >
            购买
          </FloatButton>
        </Space>
      </Card>

      <Card title="带 Badge 徽标">
        <FloatButton
          type="primary"
          icon={<ShoppingCartOutlined />}
          badge={{ count: 5 }}
        />
        <FloatButton
          type="primary"
          icon={<ShoppingCartOutlined />}
          badge={{ dot: true, offset: [-5, 10] }}
          style={{ marginLeft: 50 }}
        />
      </Card>
    </Space>
  );
};

export default FloatButtonDemo;
