"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import TextInput from "./textInput";
import SelectApp from "./select";
import { Modal } from "antd";
import GradientButton from "./gradientBtn";
import { useTranslation } from "@/app/i18n/client";
import Uploader from "./uploader";
import { Formik } from "formik";
import { ValidationContactForm } from "@/lib/validations";
import { homeDataType } from "@/lib/types";

function formatText(text: string) {
  return text.replace(/-/g, "_").toLowerCase();
}

export default function ProjectRequest({ lng, data }: { lng: string; data: homeDataType | null }) {
  const { ref } = useSectionInView("project_request");
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation(lng, "home");

  return (
    <motion.section
      id="project_request"
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
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            relatedQuestionId: "",
            projectCost: NaN,
            packageCost: NaN,
            packageRelatedCost: NaN,
            packageRelatedAnswer: "",
            relatedObj: null,
          }}
          validationSchema={ValidationContactForm}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setValues }) => (
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
                  <SelectApp
                    placeholder={t("communication_way_hint")}
                    options={data?.projectFormDetail?.formQuestions?.communicationWayData?.map((item) => ({
                      label: item.title,
                      value: item.id,
                    }))}
                  />
                </div>
                <div>
                  <SelectApp
                    placeholder={t("project_category_hint")}
                    options={data?.projectFormDetail?.formQuestions?.projectCategory?.map((item) => ({
                      label: item.title,
                      value: item.id,
                      cost: item.cost,
                    }))}
                    onChange={(e, r: any) => setValues({ ...values, projectCost: r?.cost })}
                  />
                </div>
                <div>
                  <SelectApp
                    placeholder={t("project_package_hint")}
                    options={data?.projectFormDetail?.formQuestions?.projectPackage?.map((item) => ({
                      label: item.title,
                      value: item.id,
                      relatedQuestionId: item.relatedQuestionId,
                      cost: item.cost,
                    }))}
                    onChange={(e, r: any) =>
                      setValues({ ...values, packageCost: r?.cost, relatedQuestionId: r.relatedQuestionId })
                    }
                  />
                </div>
                {values.relatedQuestionId ? (
                  <div>
                    <SelectApp
                      placeholder={t("project_package_related_hint")}
                      options={// @ts-ignore
                      data?.projectFormDetail?.formQuestions?.[`relatedQuestion${values?.relatedQuestionId}`]?.map(
                        (item: any) => ({
                          label: item.title,
                          value: item.id,
                          obj: item,
                        })
                      )}
                      onChange={(e, r: any) => setValues({ ...values, relatedObj: r.obj })}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {values.relatedObj ? (
                  <div>
                    <SelectApp
                      placeholder={t("project_package_related_answer_hint")}
                      options={// @ts-ignore
                      values?.relatedObj?.answers?.map((item: any) => ({
                        label: item,
                        value: item,
                      }))}
                      onChange={(e, r: any) =>
                        setValues({
                          ...values,
                          packageRelatedCost: values.relatedObj?.[formatText(e)] || 0,
                          packageRelatedAnswer: e,
                        })
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <TextInput placeholder={t("title_request_hint")} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <SubmitBtn className="mt-4 mr-auto">{t("send_btn")}</SubmitBtn>
                <p>Total: {values.projectCost || 0 + values.packageRelatedCost || 0 + values.packageCost || 0}</p>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </motion.section>
  );
}
