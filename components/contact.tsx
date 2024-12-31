"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
// import dynamic from "next/dynamic";

import SubmitBtn from "./submit-btn";
import { useTranslation } from "@/app/i18n/client";
import { homeDataType } from "@/lib/types";
import { ErrorMessage, Formik } from "formik";
import { ValidationContactForm } from "@/lib/validations";
import TextInput from "./textInput";
import TextAreaInput from "./textarea";
import toast from "react-hot-toast";

export default function Contact({ lng, data }: { lng: string; data: homeDataType | null }) {
  const { ref } = useSectionInView("contact");
  const { t } = useTranslation(lng, "home");

  console.log();

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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await setSubmitting(true);
          await sendEmail(values);
          await setSubmitting(false);
          toast.success("Email sent successfully!");
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="mt-10 flex flex-col dark:text-black">
            <div className="w-full">
              <TextInput
                className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
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
                className="h-52 w-full mt-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
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
