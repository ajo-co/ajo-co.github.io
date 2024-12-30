"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
// import dynamic from "next/dynamic";

import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import TextInput from "./textInput";
import SelectApp from "./select";
import { Modal } from "antd";
import GradientButton from "./gradientBtn";
import { useTranslation } from "@/app/i18n/client";
import Uploader from "./uploader";

export default function ProjectRequest({ lng }: { lng: string }) {
  const { ref } = useSectionInView("contact");
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation(lng, "home");

  return (
    <motion.section
      id="projectRequest"
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
      <SectionHeading>{t("project_request_title")}</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80 mb-28">{t("project_request_text")}</p>

      <GradientButton onClick={() => setOpenModal(true)}>{t("project_request_btn_text")}</GradientButton>

      <Modal
        title={t("project_request_title")}
        centered
        open={openModal}
        onClose={() => setOpenModal(false)}
        // onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={false}
        width={1000}
      >
        <form
          className="mt-10 flex flex-col dark:text-black"
          action={async (formData) => {
            // const { data, error } = await sendEmail(formData);

            // if (error) {
            //   toast.error(error);
            //   return;
            // }

            toast.success("Email sent successfully!");
          }}
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <TextInput placeholder={t("name_hint")} />
            </div>
            <div>
              <TextInput placeholder={t("email_hint")} />
            </div>
            <div>
              <TextInput placeholder={t("phone_number_hint")} type="number" />
            </div>
            <div>
              <TextInput placeholder={t("country_hint")} />
            </div>
            <div>
              <TextInput placeholder={t("province_hint")} />
            </div>
            <div>
              <TextInput placeholder={t("city_hint")} />
            </div>
            <div>
              <SelectApp placeholder={t("communication_way_hint")} />
            </div>
            <div>
              <SelectApp placeholder={t("project_category_hint")} />
            </div>
            <div>
              <TextInput placeholder={t("title_request_hint")} />
            </div>
          </div>
          <SubmitBtn className="mt-4 mr-auto">{t("send_btn")}</SubmitBtn>
        </form>
      </Modal>
    </motion.section>
  );
}
