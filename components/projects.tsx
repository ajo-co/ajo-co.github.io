"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";

interface IProps {
  lng: string;
  data?: homeDataType | null;
}

export default function Projects({ lng, data }: IProps) {
  const { ref } = useSectionInView("projects", 0.5);
  const { t } = useTranslation(lng, "home");

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>{t("project_title")}</SectionHeading>
      <div>
        {data?.projects?.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} logo={data?.projectDefaultImage} lng={lng} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
