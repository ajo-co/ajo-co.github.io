"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
// import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import SubmitBtn from "./submit-btn";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";
import { ErrorMessage, Formik } from "formik";
import { ValidationContactForm } from "@/lib/validations";
import TextInput from "./textInput";
import toast from "react-hot-toast";

export default function Contact({ lng, data }: { lng: string; data: homeDataType | null }) {
  const { ref } = useSectionInView("contact");
  const { t } = useTranslation(lng, "home");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: { email: string; message: string }, callbak: () => void) => {
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Your EmailJS service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Your EmailJS template ID
        {
          from_email: values.email,
          message: values.message,
          to_email: `reza1880z2@gmail.com, ${process.env.NEXT_PUBLIC_EMAIL_HOST_USER}`, // Your recipient email
        }
      );

      if (result.status === 200) {
        toast.success(t("email_success_message"));
        callbak();
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{t("contact_us")}</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">{t("contact_us_text", { EMAIL: data?.email })}</p>

      <Formik
        initialValues={{ email: "", message: "" }}
        validationSchema={ValidationContactForm}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values as any, () => resetForm());
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form className="mt-10 flex flex-col dark:text-black">
            <div className="w-full">
              <TextInput
                // className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
                name="email"
                value={values.email}
                maxLength={500}
                placeholder={t("contact_email_hint")}
                onChange={handleChange}
              />
              {touched.email && (
                <ErrorMessage
                  name="email"
                  render={(text) => (
                    <p className="text-red-600 text-xs pt-2 w-full text-left rtl:text-right">{t(text)}</p>
                  )}
                />
              )}
            </div>
            <div className="w-full mb-4">
              <textarea
                className="h-52 w-full mt-3 rounded-lg borderBlack p-3 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none text-sm dark:bg-transparent dark:border-white dark:text-white"
                name="message"
                value={values.message}
                placeholder={t("contact_message_hint")}
                maxLength={1000}
                onChange={handleChange}
              />
              {touched.message && (
                <ErrorMessage
                  name="message"
                  render={(text) => <p className="text-red-600 text-xs w-full text-left rtl:text-right">{t(text)}</p>}
                />
              )}
            </div>
            <SubmitBtn type="button" onClick={() => handleSubmit()} loading={isSubmitting}>
              {t("send_btn")}
            </SubmitBtn>
          </form>
        )}
      </Formik>
    </motion.section>
  );
}
