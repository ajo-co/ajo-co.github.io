import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact, FaCss3Alt, FaHtml5, FaVuejs, FaNodeJs, FaGitAlt, FaPython } from "react-icons/fa";
import {
  SiTailwindcss,
  SiPrisma,
  SiMongodb,
  SiRedux,
  SiApollographql,
  SiExpress,
  SiPostgresql,
  SiDjango,
} from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";
import { LuGraduationCap } from "react-icons/lu";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import { TbBrandNextjs, TbBrandFramerMotion } from "react-icons/tb";

import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Fullstack Developer",
    location: "Monir Co. (Kermanshah)",
    description:
      "was a full stack developer at this company, where I played a role in the development of accounting applications and adbased platforms (similar to Divar), among others.",
    icon: React.createElement(LuGraduationCap),
    date: "2017 - 2019",
  },
  {
    title: "CTO and Full Stack Developer",
    location: "Diyar Ryan Borna (Khorramabad)",
    description:
      "I was the technical team lead and chairman of the board of the company, where we designed management systems and GIS systems, as well as several news and e-commerce websites using leading technologies.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Backend Team Lead",
    location: "Arta Mehr Artan (Khorramabad)",
    description:
      "I was the technical team lead of the group, where we designed management and national systems, as well as several ecommerce products using leading technologies. In this field, we conducted research and implementation regarding various control and monitoring systems.",
    icon: React.createElement(FaReact),
    date: "2021",
  },
  {
    title: "Backend Team Lead",
    location: "Arta Mehr Artan (Khorramabad)",
    description:
      "I was the technical team lead of the group, where we designed management and national systems, as well as several ecommerce products using leading technologies. In this field, we conducted research and implementation regarding various control and monitoring systems.",
    icon: React.createElement(FaReact),
    date: "2021",
  },
] as const;

export const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  {
    title: "HTML5",
    id: 1,
    Icon: FaHtml5,
  },
  {
    title: "CSS3",
    id: 2,
    Icon: FaCss3Alt,
  },
  {
    title: "JavaScript",
    id: 3,
    Icon: IoLogoJavascript,
  },
  {
    title: "TypeScript",
    id: 4,
    Icon: BiLogoTypescript,
  },
  {
    title: "React",
    id: 5,
    Icon: FaReact,
  },
  {
    title: "Next.js",
    id: 6,
    Icon: TbBrandNextjs,
  },
  {
    title: "Vue.js",
    id: 21,
    Icon: FaVuejs,
  },
  {
    title: "Node.js",
    id: 7,
    Icon: FaNodeJs,
  },
  {
    title: "Git",
    id: 8,
    Icon: FaGitAlt,
  },
  {
    title: "Tailwind",
    id: 9,
    Icon: SiTailwindcss,
  },
  {
    title: "Prisma",
    id: 10,
    Icon: SiPrisma,
  },
  {
    title: "MongoDB",
    id: 11,
    Icon: SiMongodb,
  },
  {
    title: "Redux",
    id: 12,
    Icon: SiRedux,
  },
  {
    title: "GraphQL",
    id: 13,
    Icon: GrGraphQl,
  },

  {
    title: "Apollo",
    id: 15,
    Icon: SiApollographql,
  },
  {
    title: "Express",
    id: 16,
    Icon: SiExpress,
  },
  {
    title: "PostgreSQL",
    id: 17,
    Icon: SiPostgresql,
  },
  {
    title: "Python",
    id: 18,
    Icon: FaPython,
  },
  {
    title: "Django",
    id: 19,
    Icon: SiDjango,
  },
  {
    title: "Framer Motion",
    id: 20,
    Icon: TbBrandFramerMotion,
  },
];
