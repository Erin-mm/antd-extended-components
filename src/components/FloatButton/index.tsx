// src/components/FloatButton/FloatButton.tsx
import React from 'react';
import { Button, Badge, ButtonProps } from 'antd';
import './style.css'; // 导入样式文件

// 参考 Semi Design 的属性定义
export interface FloatButtonProps extends Omit<ButtonProps, 'type' | 'icon'> {
  /** 按钮颜色，用于设置 Antd Button 的 type */
  type?: 'primary' | 'default';
  /** 悬浮按钮的形状 */
  shape?: 'square' | 'circle';
  /** 悬浮按钮的尺寸 */
  size?: 'default' | 'small' | 'large';
  /** 按钮内部图标 */
  icon?: React.ReactNode;
  /** 徽标属性，传入 Antd Badge 的 props */
  badge?: {
    count: number;
    dot?: boolean;
    offset?: [number, number];
    style?: React.CSSProperties;
    [key: string]: any;
  };
}

const FloatButton: React.FC<FloatButtonProps> = ({
  type = 'primary',
  shape = 'circle',
  size = 'default',
  icon,
  badge,
  className = '',
  children,
  ...rest
}) => {
  // 根据 shape 调整 className
  const floatClassName = `ant-extended-float-btn-${shape} ${className}`;
  
  // 核心 Button
  const buttonContent = (
    <Button
      type={type}
      shape={shape} // Antd Button 的 shape 支持 circle
      size={size}
      icon={icon}
      className={floatClassName}
      style={{ 
          // 如果是 square 形状，我们可能需要定制样式，但 Antd 默认 Button 足够用
      }}
      {...rest}
    >
      {/* 确保只在有子元素时渲染 children */}
      {shape !== 'circle' && children} 
    </Button>
  );

  // 如果有 badge 属性，使用 Badge 包裹
  if (badge && badge.count !== 0) {
    // 默认定位徽标在右上角
    const badgeStyle = { 
        position: 'absolute', 
        top: badge.offset ? badge.offset[0] : 0, 
        right: badge.offset ? badge.offset[1] : 0 
    };

    return (
      <Badge {...badge} offset={badge.offset}>
        {buttonContent}
      </Badge>
    );
  }

  return buttonContent;
};
export { FloatButton }; 
