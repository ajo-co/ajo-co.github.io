"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";
import Image from "next/image";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

interface IProps {
  lng: string;
  data?: homeDataType | null;
}

export default function Skills({ lng, data }: IProps) {
  const { ref } = useSectionInView("skills");
  const { t } = useTranslation(lng, "home");

  return (
    <section id="skills" ref={ref} className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">
      <SectionHeading>{t("skill_title")}</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {data?.skills?.map((skill, index) => (
          <motion.li
            className="bg-white borderBlack rounded-xl px-5 py-3 flex items-center gap-[6px] dark:bg-white/10 dark:text-white/80"
            dir="ltr"
            key={skill.id}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.Icon ? (
              <Image src={skill.Icon} alt={skill.title} width={18} height={18} className="h-[18px] w-[18px]" />
            ) : (
              <></>
            )}
            {skill.title}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
