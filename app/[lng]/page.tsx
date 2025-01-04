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
import { useSelector } from "react-redux";

interface IProps {
  params: { lng: string };
}

export default function Home({ params: { lng } }: IProps) {
  const dispatch = useAppDispatch();
  const { homeData } = useSelector((state: any) => state.homeData);

  useEffect(() => {
    dispatch(getHomeData(lng));
  }, [lng, dispatch]);

  const showHideSection = (name: string) => {
    return homeData?.data?.menu?.find((r: any) => r.hash === name && r.show);
  };

  if (homeData.loading) return <Loader loading={homeData.loading} />;
  return (
    <main className="flex flex-col items-center px-4">
      {showHideSection("home") && <Intro lng={lng} data={homeData.data} />}
      <SectionDivider />
      {showHideSection("about") && <About lng={lng} data={homeData.data} />}
      {showHideSection("projects") && <Projects lng={lng} data={homeData.data} />}
      {/* {showHideSection("skills") && <Skills lng={lng} data={homeData.data} />} */}
      {showHideSection("experience") && <Experience lng={lng} data={homeData.data} />}
      {showHideSection("team") && <OurTeam lng={lng} data={homeData.data} />}
      {showHideSection("projectRequest") && <ProjectRequest lng={lng} data={homeData.data} />}
      {showHideSection("contact") && <Contact lng={lng} data={homeData.data} />}
      <Footer lng={lng} data={homeData.data} />
    </main>
  );
}
