// antd-extended-components/src/demo/Demo.tsx
import { useState } from "react";
import { InfiniteSelect } from "../index"; // 从组件库入口导入组件

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

  return (
    <div style={{ padding: 50 }}>
      <h1>InfiniteSelect Ant Design 扩展组件演示</h1>
      <InfiniteSelect
        style={{ width: 300 }}
        placeholder="请选择"
        options={currentOptions}
        loadMoreOptions={handleLoadMore}
        onChange={setSelectedValue}
        value={selectedValue}
        showSearch // 保持 Select 的其他功能
      />
      <p style={{ marginTop: 20 }}>当前选中值: {selectedValue || "未选择"}</p>
    </div>
  );
};

export default Demo;
