"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";

export default function About({ lng }: { lng: string }) {
  const { ref } = useSectionInView("About");
  const { t } = useTranslation(lng, "home");

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
      <p className="mb-3">{t("about_us_text")}</p>
      <h3 className="text-lg font-bold">{t("about_us_text_head")}</h3>
      <p className="flex flex-col">
        <span className="italic">{t("about_us_text_option_one")}</span>
        <span className="italic">{t("about_us_text_option_two")}</span>
        <span className="italic">{t("about_us_text_option_three")}</span>
      </p>
      <p>{t("about_us_text_final")}</p>
    </motion.section>
  );
}
