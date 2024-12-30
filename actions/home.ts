"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

export const homeAction = async () => {
  let data;
  try {
    data = await fetch(process.env.API_URL + "/jsons/fa.json");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
