import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { languages } from "../i18n/settings";
import { Suspense } from "react";
import Loader from "@/components/loader";
import ClientProvider from "@/providers/clientProvider";
import "../globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <div className="overflow-hidden right-0 w-full top-0 absolute pt-24 min-h-screen">
      <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
      <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
      <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <Suspense fallback={<Loader loading={true} />}>
            <ClientProvider lng={lng}>{children}</ClientProvider>
          </Suspense>
        </ActiveSectionContextProvider>
      </ThemeContextProvider>
    </div>
  );
}
