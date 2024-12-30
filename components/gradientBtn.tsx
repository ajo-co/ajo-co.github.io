import React, { ReactNode } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

interface IProps {
  children: ReactNode;
  onClick?: () => void;
}

const GradientButton = ({ children, onClick }: IProps) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button
        onClick={onClick}
        type="primary"
        size="large"
        icon={<AntDesignOutlined />}
        className="h-12 rounded-3xl w-full"
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default GradientButton;
