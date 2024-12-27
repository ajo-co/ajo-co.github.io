import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

interface IProps {
  params: { lng: string };
}

export default function Home({ params: { lng } }: IProps) {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro lng={lng} />
      <SectionDivider />
      <About lng={lng} />
      <Projects lng={lng} />
      <Skills lng={lng} />
      <Experience />
      <Contact />
    </main>
  );
}
