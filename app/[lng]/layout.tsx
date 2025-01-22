import Header from "@/components/header";
import "../globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
// import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { dir } from "i18next";
import LanguageSwitch from "@/components/language-switch";
import { languages } from "../i18n/settings";
import { Suspense } from "react";
import Loader from "@/components/loader";
import store from "@/store";
import { Provider as ReduxProvider } from "react-redux";
import ClientProvider from "@/providers/clientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fidaar",
  description: "Fidaar Corp",
};

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
    <html lang={lng} dir={dir(lng)} className="!scroll-smooth">
      <body
        className={`${
          //  inter.className
          // "font-[Vazirmatn]"
          ""
        } ${
          dir(lng) === "rtl" ? "text-right" : "text-left"
        } bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 overflow-x-hidden`}
      >
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
      </body>
    </html>
  );
}
