// src/demo/FloatButtonDemo.tsx (新增)

import React from "react";
import FloatButton from "../../components/FloatButton";
import { Row, Col } from "antd";
import {
  PlusOutlined,
  ShoppingCartOutlined,
  RightOutlined,
  LeftOutlined,
  BorderOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CodeBox from "../components/CodeBox";
import PropsTable from "../components/PropsTable";

const FloatButtonDemo: React.FC = () => {
  return (
    <div>
      <h1>FloatButton 浮动按钮示例</h1>
      <Row gutter={16}>
        <Col span={12}>
          <CodeBox
            title="基础用法"
            codeString={`
  import { FloatButton } from "antd-extended-components";
  import { ShoppingCartOutlined } from "@ant-design/icons";

  const Demo = () => {
    return (  
      <FloatButton icon={<ShoppingCartOutlined />} />
    );
  };
  export default Demo;
          `}
          >
            &nbsp;
            <FloatButton icon={<ShoppingCartOutlined />} />
          </CodeBox>
        </Col>
        <Col span={12}>
          <CodeBox
            title="尺寸"
            codeString={`
  import { FloatButton } from "antd-extended-components";
  import { PlusOutlined } from "@ant-design/icons";

  const Demo = () => {
    return (  
      <FloatButton icon={<ShoppingCartOutlined />} style={{ bottom: 60, right: 60 }} />
    );
  };
  export default Demo;
          `}
          >
            支持改变位置,通过style改变bottom和right的值
            <FloatButton icon={<PlusOutlined />} style={{ right: 100 }} />
          </CodeBox>
        </Col>
        <Col span={12}>
          <CodeBox
            title="尺寸"
            codeString={`
  import { FloatButton } from "antd-extended-components";
  import { RightOutlined, LeftOutlined } from "@ant-design/icons";

  const Demo = () => {
    return (  
      <FloatButton icon={<RightOutlined />} size="small" style={{ bottom: 100 }} />
      <FloatButton icon={<LeftOutlined />} size="large" style={{ bottom: 60 }} />
    );
  };
  export default Demo;
  `}
          >
            支持三种尺寸：默认，小，大
            <FloatButton
              icon={<RightOutlined />}
              size="small"
              style={{ bottom: 150 }}
            />
            <FloatButton
              icon={<LeftOutlined />}
              size="large"
              style={{ bottom: 100 }}
            />
          </CodeBox>
        </Col>
        <Col span={12}>
          <CodeBox
            title="带 Badge 徽标"
            codeString={`
  import { FloatButton } from "antd-extended-components";
  import { ShoppingCartOutlined } from "@ant-design/icons";

  const Demo = () => {
    return (  
      <FloatButton icon={<ShoppingCartOutlined />} badge={{ count: 5 }} style={{ bottom: 100, right: 100 }} />
      <FloatButton icon={<ShoppingCartOutlined />} badge={{ count: 999, style: { backgroundColor: "#52c41a" } }} style={{ bottom: 150, right: 100 }} />
    );
  };
  export default Demo;
  `}
          >
            支持徽标数量，通过badge属性设置
            <FloatButton
              icon={<ShoppingCartOutlined />}
              badge={{ count: 5 }}
              style={{ bottom: 100, right: 100 }}
            />
            <FloatButton
              icon={<ShoppingCartOutlined />}
              badge={{ count: 999, style: { backgroundColor: "#52c41a" } }}
              style={{ bottom: 150, right: 100 }}
            />
          </CodeBox>
        </Col>
        <Col span={12}>
          <CodeBox
            title="形状"
            codeString={`
  import { FloatButton } from "antd-extended-components";
  import { BorderOutlined } from "@ant-design/icons";

  const Demo = () => {
    return (  
      <FloatButton type="primary" icon={<BorderOutlined />} shape="square" style={{ bottom: 50, right: 150 }} />
    );
  };
  export default Demo;
  `}
          >
            默认定义了两种形状：circle（默认）、square。
            <FloatButton
              type="primary"
              icon={<BorderOutlined />}
              shape="square"
              style={{ bottom: 50, right: 150 }}
            />
          </CodeBox>
        </Col>
        <Col span={12}>
          <CodeBox
            title="浮动按钮组"
            codeString={`
  import { FloatButton } from "antd-extended-components";
  import { ReloadOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";

  const Demo = () => {
    return (  
      <FloatButton.Group shape="square" style={{ bottom: 100, right: 150 }}>
        <FloatButton icon={<ReloadOutlined />} />
        <FloatButton icon={<SearchOutlined />} />
        <FloatButton icon={<SettingOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group shape="circle" style={{ bottom: 100, right: 200 }}>
        <FloatButton icon={<ReloadOutlined />} />
        <FloatButton icon={<SearchOutlined />} />
        <FloatButton icon={<SettingOutlined />} />
      </FloatButton.Group>
    );
  };
  export default Demo;
  `}
          >
            按钮组合使用时，推荐使用 FloatButton.Group ，并通过设置 shape
            属性改变悬浮按钮组的形状。悬浮按钮组的 shape 会覆盖内部 FloatButton
            的 shape 属性。
            <FloatButton.Group
              shape="square"
              style={{ bottom: 100, right: 150 }}
            >
              <FloatButton icon={<ReloadOutlined />} />
              <FloatButton icon={<SearchOutlined />} />
              <FloatButton icon={<SettingOutlined />} />
            </FloatButton.Group>
            <FloatButton.Group
              shape="circle"
              style={{ bottom: 100, right: 200 }}
            >
              <FloatButton icon={<ReloadOutlined />} />
              <FloatButton icon={<SearchOutlined />} />
              <FloatButton icon={<SettingOutlined />} />
            </FloatButton.Group>
          </CodeBox>
        </Col>
      </Row>
      <h2>参数说明</h2>
      <h4>
        FloatButton 继承了 Ant Design Button
        的所有属性，并增加了以下核心扩展属性：
      </h4>
      <PropsTable
        dataSource={[
          {
            prop: "badge",
            description: "徽章参数",
            type: "BadgeProps",
            defaultValue: "-",
            version: "1.0.0",
          },
          {
            prop: "style",
            description: "样式，用于设置按钮的位置",
            type: "React.CSSProperties",
            defaultValue: "-",
            version: "1.0.0",
          },
        ]}
      />
      <h2>FloatButton.Group</h2>
      <PropsTable
        dataSource={[
          {
            prop: "shape",
            description: "按钮组的形状",
            type: "square | circle",
            defaultValue: "square",
            version: "1.0.0",
          },
        ]}
      />
    </div>
  );
};

export default FloatButtonDemo;
