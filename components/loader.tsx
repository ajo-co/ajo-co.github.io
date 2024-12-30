import { Spin } from "antd";
import React from "react";

export default function Loader({ loading }: { loading?: boolean }) {
  if (loading)
    return (
      <div className="fixed top-0 right-0 w-full h-full z-[1000] bg-opacity-70 bg-white flex items-center justify-center">
        <div className="w-[150px] h-[150px] rounded-full bg-white flex items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
    );
}
