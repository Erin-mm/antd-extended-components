// src/components/InfiniteSelect/index.tsx
import React, { useState, useEffect } from 'react';
import { Select, Spin, SelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';

// 定义 InfiniteSelect 组件的独有 Props
export interface InfiniteSelectProps extends SelectProps {
  // 必须传入一个函数，用于加载更多数据
  loadMoreOptions: (page: number) => Promise<DefaultOptionType[]>;
  // 外部传入当前是否在加载中（例如，第一次加载或搜索时）。
  initialLoading?: boolean;
  // 初始页码 (默认为 1)
  initialPage?: number;
  // 外部传入的初始选项数组（通常是第 1 页数据）
  options?: DefaultOptionType[]; 
}

const InfiniteSelect: React.FC<InfiniteSelectProps> = ({
  options: initialOptions,
  loadMoreOptions,
  initialLoading = false, // 默认不加载
  initialPage = 1,        // 默认第 1 页
  onPopupScroll: externalOnPopupScroll, // 接收并传递给 Select
  ...restProps
}) => {
  const [data, setData] = useState(initialOptions || []); // 内部管理的所有数据
  // 仅用于分页加载的状态，与 initialLoading 分开
  const [isPagingLoading, setIsPagingLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(initialPage); 
  // 假设初始状态有更多数据，直到 loadMoreOptions 返回空数组
  const [hasMore, setHasMore] = useState(true); 
  
  // 1. 外部选项变化（如搜索结果）时，重置内部状态
  useEffect(() => {
    setData(initialOptions || []);
    setCurrentPage(initialPage);
    // ⚠️ 假设外部数据变化时，我们总是从头开始，且有更多数据
    setHasMore(true); 
  }, [initialOptions, initialPage]);


  // --- 核心逻辑：分页加载 ---
  const handleLoadMore = async (nextPage: number) => {
    // 检查拦截条件：当前正在加载（初始或分页），或已无更多数据
    if (initialLoading || isPagingLoading || !hasMore) {
      console.log('阻止加载：正在加载或已无更多数据');
      return;
    }

    setIsPagingLoading(true); // 开始分页加载
    try {
      const newOptions = await loadMoreOptions(nextPage);

      if (newOptions.length === 0) {
        setHasMore(false); // 没有更多数据了
      } else {
        setData((prevData) => [...prevData, ...newOptions]);
        setCurrentPage(nextPage); // 更新已加载到的页码
      }
    } catch (error) {
      console.error('InfiniteSelect 加载更多失败:', error);
      setHasMore(false); 
    } finally {
      setIsPagingLoading(false); // 结束分页加载
    }
  };

  // --- 滚动回调逻辑 ---
  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; 
    
    // 关键判断：触底逻辑
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;
    const scrollHeight = target.scrollHeight;
    
    // 容错判断：在底部 5 像素内触发
    const isBottom = scrollTop + clientHeight >= scrollHeight - 5; 

    if (isBottom) {
      console.log('滚动触底，尝试加载下一页');
      handleLoadMore(currentPage + 1);
    }

    // 执行外部传入的 onPopupScroll 回调
    if (externalOnPopupScroll) {
      externalOnPopupScroll(e);
    }
  };

  // --- 渲染逻辑：注入加载状态 ---
  const customDropdownRender = (menu: React.ReactElement) => (
    <>
      {menu} 
      
      {/* 底部加载指示器：只在分页加载（isPagingLoading）时显示 */}
      {isPagingLoading && hasMore && ( 
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <Spin size="small" />
          <span style={{ marginLeft: 8 }}>加载中...</span>
        </div>
      )}
      
      {/* 没有更多数据提示：在没有分页加载，有数据，但已无更多数据时显示 */}
      {!isPagingLoading && !hasMore && data.length > 0 && (
        <div style={{ textAlign: 'center', padding: '10px 0', color: '#999' }}>
          没有更多数据了
        </div>
      )}
    </>
  );

  return (
    <Select
      options={data} 
      // Select 的 loading 属性，通常用于初始加载或搜索加载
      loading={initialLoading || isPagingLoading} 
      onPopupScroll={handlePopupScroll} 
      dropdownRender={customDropdownRender} 
      // 传递所有剩余的 Antd Select Props
      {...restProps}
    />
  );
};

// 确保使用具名导出
export default InfiniteSelect; 

// 别忘了在 src/index.ts 中也使用具名导出
// export { InfiniteSelect } from './components/InfiniteSelect';