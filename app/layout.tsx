import { Inter } from "next/font/google";
import { dir } from "i18next";
import { languages } from "./i18n/settings";

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
        {children}
      </body>
    </html>
  );
}
