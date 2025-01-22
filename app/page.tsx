"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";
import { cookieName } from "./i18n/settings";

export default function Page() {
  const cookies = getCookie(cookieName);

  console.log(cookies);
  useEffect(() => {
    redirect(`/${cookies ? cookies : "en"}`);
  }, []);

  return <div></div>;
}
