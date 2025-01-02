"use client";
// import { homeAction } from "@/actions/home";
import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Loader from "@/components/loader";
import ProjectRequest from "@/components/projectRequest";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { homeDataType } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "../i18n/client";
import Footer from "@/components/footer";
import OurTeam from "@/components/team";

interface IProps {
  params: { lng: string };
}

export default function Home({ params: { lng } }: IProps) {
  const [data, setData] = useState<homeDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(lng, "home");

  const homeAction = async () => {
    try {
      setLoading(true);
      const res: any = await fetch(process.env.NEXT_PUBLIC_API_URL + `/jsons/${lng}.json`);
      const data = await res.json();
      setData(data);
    } catch (error: unknown) {
      return {
        error: getErrorMessage(error),
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    homeAction();
  }, [lng]);

  if (loading) return <Loader loading={loading} />;
  return (
    <main className="flex flex-col items-center px-4">
      <Intro lng={lng} data={data} />
      <SectionDivider />
      <About lng={lng} data={data} />
      <Projects lng={lng} data={data} />
      <Skills lng={lng} data={data} />
      <Experience lng={lng} data={data} />
      <OurTeam lng={lng} data={data} />
      <ProjectRequest lng={lng} data={data} />
      <Contact lng={lng} data={data} />
      <Footer lng={lng} data={data} />
    </main>
  );
}
