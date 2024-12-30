/* eslint-disable no-unused-expressions */
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import React from "react";

interface IProps extends TextAreaProps {}
const { TextArea } = Input;

export default function TextAreaInput({ ...rest }: IProps) {
  <TextArea rows={4} className="w-full" {...rest} />;
}
