"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { homeDataType } from "@/lib/types";
import { useTranslation } from "@/app/i18n/client";

interface IProps {
  lng: string;
  data?: homeDataType | null;
}

export default function Experience({ lng, data }: IProps) {
  const { ref } = useSectionInView("experience");
  const { theme } = useTheme();
  const { t } = useTranslation(lng, "home");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40" style={{ direction: "ltr" }}>
      <SectionHeading>{t("experience_title")}</SectionHeading>
      <VerticalTimeline lineColor="">
        {data?.experiences?.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible
              contentStyle={{
                background: theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
                direction: "ltr",
              }}
              contentArrowStyle={{
                borderRight: theme === "light" ? "0.4rem solid #9ca3af" : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize rtl:text-right">{item.title}</h3>
              <p className="font-normal !mt-0 rtl:text-right">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75 rtl:text-right">{item.description}</p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
