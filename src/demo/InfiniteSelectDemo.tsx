import { useState } from "react";
import { Row, Col } from "antd";
import CodeBox from "./components/CodeBox";
import InfiniteSelect from "../components/InfiniteSelect";
import PropsTable from "./components/PropsTable";

const MOCK_OPTIONS = Array.from({ length: 100 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `value-${i + 1}`,
}));

const Demo = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const currentOptions = MOCK_OPTIONS.slice(0, 10);

  // 模拟异步加载数据的函数
  const loadMore = async (page: number) => {
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        const pageSize = 10;
        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        resolve(MOCK_OPTIONS.slice(start, end));
      }, 1000); // 模拟网络延迟
    });
  };

  // InfiniteSelect 独有的 loadMoreOptions
  const handleLoadMore = async (page: number) => {
    const newOptions = await loadMore(page);
    return newOptions; // 返回新的 options
  };

  const codeString = `
  import { InfiniteSelect } from "antd-extended-components";
  import { useState } from "react";

  const MOCK_OPTIONS = Array.from({ length: 100 }, (_, i) => ({
    label: "Option " + (i + 1),
    value: "value-" + (i + 1),
  }));

 
  const Demo = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      undefined
    );
    const currentOptions = MOCK_OPTIONS.slice(0, 10);

    // 模拟异步加载数据的函数
    const loadMore = async (page: number) => {
      return new Promise<any[]>((resolve) => {
        setTimeout(() => {
          const pageSize = 10;
          const start = (page - 1) * pageSize;
          const end = page * pageSize;
          resolve(MOCK_OPTIONS.slice(start, end));
        }, 1000); // 模拟网络延迟
      });
    };

    // InfiniteSelect 独有的 loadMoreOptions
    const handleLoadMore = async (page: number) => {
      const newOptions = await loadMore(page);
      return newOptions; // 返回新的 options
    };

    return (
      <InfiniteSelect
        style={{ width: 300 }}
        placeholder="请选择"
        options={currentOptions}
        loadMoreOptions={handleLoadMore}
        onChange={setSelectedValue}
        value={selectedValue}
        showSearch // 保持 Select 的其他功能
      />
    );
  };

  export default Demo;
  `;

  return (
    <div>
      <h1>InfiniteSelect Select 扩展组件演示</h1>
      <Row>
        <Col span={24}>
          <CodeBox title="基础用法" codeString={codeString}>
            <InfiniteSelect
              style={{ width: 300 }}
              placeholder="请选择"
              options={currentOptions}
              loadMoreOptions={handleLoadMore}
              onChange={setSelectedValue}
              value={selectedValue}
              showSearch // 保持 Select 的其他功能
            />
          </CodeBox>
        </Col>
      </Row>
      <h2>参数说明</h2>
      <h4>
        InfiniteSelect 继承了 Ant Design Select 的所有属性，并增加了以下核心扩展属性：
      </h4>
      <PropsTable
        dataSource={[
          {
            prop: "loadMoreOptions",
            description:
              "【核心】 异步加载更多选项的回调函数。接收将要加载的页码 page，必须返回一个包含新选项的 Promise。返回空数组时，组件将自动停止加载。",
            type: "(page: number) => Promise<OptionType[]>",
            defaultValue: "-",
            version: "1.0.0",
          },
          {
            prop: "initialLoading",
            description:
              "【可选】 外部控制的加载状态。常用于首次挂载时的初始数据请求或搜索请求。它会显示在 Select 组件的主体部分。",
            type: "boolean",
            defaultValue: "false",
            version: "1.0.0",
          },
          {
            prop: "initialPage",
            description:
              "【可选】 初始页码。如果您的后端 API 页码从 0 开始，请设置为 0。",
            type: "number",
            defaultValue: "1",
            version: "1.0.0",
          },
        ]}
      />
    </div>
  );
};

export default Demo;
