"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

export const homeAction = async () => {
  let data;
  try {
    data = await fetch(process.env.NEXT_PUBLIC_API_URL || "https://safetest.ir" + "/jsons/fa.json");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
