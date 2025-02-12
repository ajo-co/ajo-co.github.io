"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

interface IProps {
  lng: string;
  data?: homeDataType | null;
}

export default function OurTeam({ lng, data }: IProps) {
  const { ref } = useSectionInView("team", 0.5);
  const { t } = useTranslation(lng, "home");

  return (
    <section ref={ref} id="team" className="scroll-mt-28 mb-28">
      <SectionHeading>{t("team_title")}</SectionHeading>
      <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 flex-wrap gap-4">
        {data?.teamMembers?.map((item, index) => (
          <div className="flex flex-col items-start justify-center text-center" key={index}>
            <div className="rounded-full overflow-hidden m-auto">
              <Image
                src={item.avatar}
                width={180}
                height={180}
                alt={`${item.fullName} ${item.title}`}
                className="sm:w-24 lg:w-44 sm:h-24 lg:h-44 hover:scale-125 transition-all"
              />
            </div>
            <h3 className="font-peyda text-sm font-bold pt-3 pb-2 text-center m-auto">{item.fullName}</h3>
            <p className=" font-peyda text-sm text-center m-auto pb-1">{item.title}</p>
            <p className=" font-peyda text-xs text-[#5a5a5a] text-center m-auto">{item.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
