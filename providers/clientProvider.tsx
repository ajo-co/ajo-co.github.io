"use client";
import Header from "@/components/header";
import LanguageSwitch from "@/components/language-switch";
import ThemeSwitch from "@/components/theme-switch";
import store from "@/store";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";

interface IProps {
  lng: string;
  children: ReactNode;
}
export default function ClientProvider({ lng, children }: IProps) {
  return (
    <ReduxProvider store={store}>
      <Header lng={lng} />
      {children}
      <Toaster position="top-right" />
      <ThemeSwitch />
      <LanguageSwitch lng={lng} />
    </ReduxProvider>
  );
}
