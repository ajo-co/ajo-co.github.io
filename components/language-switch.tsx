"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import Image from "next/image";
import iranIcon from "@/assets/icons/iran.png";
import usaIcon from "@/assets/icons/usa.png";
import { useRouter } from "next/navigation";

interface IProps {
  lng: string;
}
export default function LanguageSwitch({ lng }: IProps) {
  const { replace } = useRouter();

  return (
    <div className="fixed bottom-5 left-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950">
      <button
        className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        onClick={() => replace(lng === "fa" ? "en" : "fa")}
        title="Switch Language"
      >
        {lng === "fa" ? (
          <Image src={iranIcon} width={25} height={25} alt="iran flag" />
        ) : (
          <Image src={usaIcon} width={25} height={25} alt="iran flag" />
        )}
      </button>
    </div>
  );
}
