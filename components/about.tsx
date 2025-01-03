"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import markdownToHtml, { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";
import { remark } from "remark";

interface IProps {
  lng: string;
  data?: homeDataType | null;
}
export default function About({ lng, data }: IProps) {
  const { ref } = useSectionInView("about");
  const { t } = useTranslation(lng, "home");

  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await markdownToHtml(data?.aboutText || "");
      setHtmlContent(html);
    };
    convertMarkdown();
  }, [data?.aboutText]);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t("about_us_title")}</SectionHeading>
      <div className="mb-3" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </motion.section>
  );
}
