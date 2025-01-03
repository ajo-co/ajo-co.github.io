import markdownToHtml from "@/lib/hooks";
import React, { useEffect, useState } from "react";

interface IProps {
  content: string;
}

export default function ModuleInfo({ content }: IProps) {
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await markdownToHtml(content || "");
      setHtmlContent(html);
    };
    convertMarkdown();
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="dark:text-white" />;
}
