import React from "react";
import { Select, SelectProps } from "antd";

interface IProps extends SelectProps {
  placeholder?: string;
}

const SelectApp = ({ ...rest }: IProps) => {
  return <Select className="w-full h-10" {...rest} />;
};

export default SelectApp;
