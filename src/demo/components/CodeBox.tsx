import styled from "styled-components";
import { Card, Divider, Space, Tooltip, message } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyOutlined, CodeOutlined } from "@ant-design/icons";
import { useState } from "react";

const CodeBox = styled.div`
  margin-bottom: 24px;
  .codeInner {
    padding: 42px 24px 50px;
  }
  .codeAction {
    padding: 12px 24px;
    display: flex;
    justify-content: flex-end;
    .anticon {
      font-size: 16px;
      cursor: pointer;
      color: #00000073;
    }
  }
`;

const copyCode = (codeString: string) => {
  // 现代浏览器推荐使用 Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        message.info("复制成功！");
      })
      .catch((err) => {
        console.error("复制失败:", err);
      });
  } else {
    // 兼容旧浏览器的方案
    const textarea = document.createElement("textarea");
    textarea.value = codeString;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("复制失败:", err);
    }
    document.body.removeChild(textarea);
    message.success("复制成功！");
  }
};

export default ({
  title = "基础用法",
  children,
  codeString = "",
}: {
  title?: string;
  children?: React.ReactNode;
  codeString?: string;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <CodeBox>
      <Card>
        <div className="codeInner">{children}</div>
        <Divider orientation="left">{title}</Divider>
        <div className="codeAction">
          <Space size={20}>
            <Tooltip title="复制代码">
              <CopyOutlined onClick={() => copyCode(codeString)} />
            </Tooltip>
            <Tooltip title="查看代码">
              <CodeOutlined onClick={() => setVisible(!visible)} />
            </Tooltip>
          </Space>
        </div>
        {visible && (
          <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
          </SyntaxHighlighter>
        )}
      </Card>
    </CodeBox>
  );
};
