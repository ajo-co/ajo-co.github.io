import React from "react";
import { redirect } from "next/navigation";
interface IProps {
  params: { lng: string };
}
export default function page({ params: { lng } }: IProps) {
  redirect(`/${lng}`);
  return <></>;
}
