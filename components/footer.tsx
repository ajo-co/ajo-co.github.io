import { homeDataType } from "@/lib/types";
import React from "react";

interface IProps {
  lng: string;
  data?: homeDataType | null;
}

export default function Footer({ lng, data }: IProps) {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <p className="text-xs">{data?.footerText}</p>
    </footer>
  );
}
