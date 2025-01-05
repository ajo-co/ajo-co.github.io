"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTranslation } from "@/app/i18n/client";
import { dir } from "i18next";
import { useReduxHomeData } from "@/store/home/hooks";

export default function Header({ lng }: { lng: string }) {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { t } = useTranslation(lng, "home");
  const { homeData } = useReduxHomeData();

  return (
    <header className="z-[999] relative">
      {/* <motion.div
        className={clsx(
          "fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75",
          dir(lng) === "ltr" ? "sm:w-[775px]" : "sm:w-[44rem]"
        )}
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div> */}

      <nav
        className={clsx(
          " flex fixed top-0 m-auto sm:h-12 py-1 sm:top-[1.7rem] sm:py-0 md:w-max justify-center left-0 right-0",
          "bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] md:h-[3.25rem] sm:rounded-3xl overflow-hidden sm:w-full"
        )}
      >
        <ul
          className={clsx(
            "flex w-max flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-1 md:gap-5",
            "sm:w-full"
          )}
        >
          {homeData?.data?.menu
            ?.filter((r) => r.show)
            .map((link) => (
              <motion.li
                className="h-auto sm:h-3/4 flex items-center justify-center relative"
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center p-[5px] sm:px-3 sm:py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                    {
                      "text-gray-950 dark:text-gray-200": activeSection === link.name,
                    }
                  )}
                  href={`#${link.hash}`}
                  onClick={() => {
                    setActiveSection(`#${link.hash}`);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  <span className="whitespace-nowrap">{t(link.name)}</span>

                  {link.name === activeSection && (
                    <motion.span
                      className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
