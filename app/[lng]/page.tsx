"use client";
import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Loader from "@/components/loader";
import ProjectRequest from "@/components/projectRequest";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { useEffect } from "react";
import Footer from "@/components/footer";
import OurTeam from "@/components/team";
import { useAppDispatch } from "@/store";
import { getHomeData } from "@/store/home/actions";
import { useReduxHomeData } from "@/store/home/hooks";

interface IProps {
  params: { lng: string };
}

export default function Home({ params: { lng } }: IProps) {
  const dispatch = useAppDispatch();
  const { homeData } = useReduxHomeData();

  useEffect(() => {
    dispatch(getHomeData(lng));
  }, [lng]);

  const showHideSwction = (name: string) => {
    return homeData?.data?.menu?.find((r) => r.hash === name && r.show);
  };

  if (homeData.loading) return <Loader loading={homeData.loading} />;
  return (
    <main className="flex flex-col items-center px-4">
      {showHideSwction("home") && <Intro lng={lng} data={homeData.data} />}
      <SectionDivider />
      {showHideSwction("about") && <About lng={lng} data={homeData.data} />}
      {showHideSwction("projects") && <Projects lng={lng} data={homeData.data} />}
      {showHideSwction("skills") && <Skills lng={lng} data={homeData.data} />}
      {showHideSwction("experience") && <Experience lng={lng} data={homeData.data} />}
      {showHideSwction("team") && <OurTeam lng={lng} data={homeData.data} />}
      {showHideSwction("projectRequest") && <ProjectRequest lng={lng} data={homeData.data} />}
      {showHideSwction("contact") && <Contact lng={lng} data={homeData.data} />}
      <Footer lng={lng} data={homeData.data} />
    </main>
  );
}
