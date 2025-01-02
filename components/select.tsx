import React from "react";
import { Select, SelectProps } from "antd";

interface IProps extends SelectProps {
  placeholder?: string;
}

const SelectApp = ({ ...rest }: IProps) => {
  return (
    <Select
      className="w-full h-10 dark:[&_.ant-select-selector]:bg-transparent dark:[&_.ant-select-selection-placeholder]:text-[#ccc] dark:[&_.ant-select-selection-item]:text-white"
      rootClassName=""
      {...rest}
    />
  );
};

export default SelectApp;
