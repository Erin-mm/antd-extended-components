// src/components/FloatButton/FloatButton.tsx
import React from "react";
import { Button, Badge, ButtonProps } from "antd";
import "./style.css"; // 导入样式文件

// 参考 Semi Design 的属性定义
export interface FloatButtonProps
  extends Omit<ButtonProps, "type" | "icon" | "shape" | "size"> {
  /** 按钮颜色，用于设置 Antd Button 的 type */
  type?: "primary" | "default";
  /** 悬浮按钮的形状 */
  shape?: "square" | "circle";
  /** 悬浮按钮的尺寸 */
  size?: "default" | "small" | "large";
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
  type = "default",
  shape = "circle",
  size = "default",
  icon,
  badge,
  className = "",
  children,
  style,
  ...rest
}) => {
  // 根据 shape 调整 className
  const floatClassName = `ant-extended-float-btn ${className}`;

  // 核心 Button
  const buttonContent = (
    <Button
      type={type}
      shape={shape === "square" ? "default" : shape} // Antd Button 的 shape 支持 circle
      size={size as any}
      icon={icon}
      {...rest}
    >
      {/* 确保只在有子元素时渲染 children */}
      {shape !== "circle" && children}
    </Button>
  );

  // 如果有 badge 属性，使用 Badge 包裹
  if (badge && badge.count !== 0) {
    return (
      <div className={floatClassName} style={style}>
        <Badge {...badge}>{buttonContent}</Badge>
      </div>
    );
  }

  return (
    <div className={floatClassName} style={style}>
      {buttonContent}
    </div>
  );
};

// FloatButton.Group 组件接口
export interface FloatButtonGroupProps {
  /** 按钮组的形状 */
  shape?: "square" | "circle";
  /** 按钮组的尺寸 */
  size?: "default" | "small" | "large";
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

// FloatButton.Group 组件
const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  shape = "circle",
  size = "default",
  style,
  className = "",
  children,
}) => {
  const groupClassName = `${
    shape === "square"
      ? "ant-extended-float-btn-group"
      : "ant-extended-float-btn-group-circle"
  } ${className}`;

  // 处理子元素，确保它们继承 shape 和 size
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as FloatButtonProps;
      return React.cloneElement(child, {
        shape: childProps.shape || shape,
        size: childProps.size || size,
      } as any);
    }
    return child;
  });

  return (
    <div className={groupClassName} style={style}>
      {childrenWithProps}
    </div>
  );
};

// 定义包含 Group 的 FloatButton 类型
interface FloatButtonComponent extends React.FC<FloatButtonProps> {
  Group: React.FC<FloatButtonGroupProps>;
}

// 将 Group 附加到 FloatButton 组件上并正确类型化
const FloatButtonWithGroup = FloatButton as FloatButtonComponent;
FloatButtonWithGroup.Group = FloatButtonGroup;

export default FloatButtonWithGroup;
