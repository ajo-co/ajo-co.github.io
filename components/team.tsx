"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
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
      <div className="mt-12">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          navigation
          pagination
          autoplay
          // lazy={true}
          // loop
          // className="static"
          // slideClass="flex items-center justify-center"
          // wrapperClass="px-20"
          // breakpoints={{
          //   768: {
          //     slidesPerView: 4,
          //     spaceBetween: 30,
          //   },
          //   550: {
          //     slidesPerView: 3,
          //     spaceBetween: 20,
          //   },
          //   0: {
          //     slidesPerView: 1,
          //     spaceBetween: 10,
          //   },
          // }}
          modules={[Pagination, Autoplay]}
        >
          {data?.teamMembers?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-hidden">
                <div
                  className="h-[210px] w-[210px] overflow-hidden rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.avatar})` }}
                >
                  {/* <Image src={item.avatar} width={180} height={180} alt={item.title} /> */}
                  {/* <img
                    src={item.avatar}
                    className="p-0 m-0 w-full absolute top-0 bottom-0 right-0 left-0 rounded-full max-h-full"
                  /> */}
                </div>
                <h3 className="font-peyda text-sm font-bold pt-3 pb-2 text-center">{item.fullName}</h3>
                <p className=" font-peyda text-sm text-center">{item.level}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
