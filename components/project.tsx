"use client";

import { useRef, useState } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { homeDataType } from "@/lib/types";
import clsx from "clsx";
import { FaPlay } from "react-icons/fa";
import { Modal } from "antd";

// type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  logo,
  videoUrl,
}: homeDataType["projects"][0] & { logo: string }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 flex max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="pt-4 pb-4 px-5 sm:pl-10 sm:pr-2 sm:pt-4 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem] sm:rtl:group-odd:mr-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description?.length > 150 ? description?.substring(0, 150) + "..." : description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="absolute hidden sm:block top-8 -right-8 w-[310px] h-[310px] rounded-t-3xl shadow-2xl
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2
        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2
        group-even:right-[initial] group-even:-left-8 overflow-hidden"
        >
          {videoUrl ? (
            <button
              className={clsx(
                "hidden absolute right-0 left-0 top-0 bottom-0 m-auto group-hover:block",
                "h-16 w-16 bg-black bg-opacity-50 rounded-full transition-all",
                "flex items-center justify-center"
              )}
              onClick={() => setShowVideoModal(true)}
            >
              <FaPlay color="#fff" className="m-auto" size={25} />
            </button>
          ) : (
            <></>
          )}
          <Image
            src={imageUrl || logo}
            alt={title}
            quality={95}
            width={310}
            height={310}
            className="
        "
          />
        </div>
      </section>

      <Modal open={showVideoModal} width={1024} footer={false} onCancel={() => setShowVideoModal(false)} title={title}>
        <video width="100%" controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Modal>
    </motion.div>
  );
}
