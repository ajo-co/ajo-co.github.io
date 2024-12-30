import { Spin } from "antd";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { FaPaperPlane } from "react-icons/fa";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface IProps {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  loading?: boolean;
}
export default function SubmitBtn({ children, disabled, className, loading, type = "submit", onClick }: IProps) {
  return (
    <button
      type={type}
      className={clsx(
        className,
        "group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && <Spin />}
      {children}
      <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
    </button>
  );
}
