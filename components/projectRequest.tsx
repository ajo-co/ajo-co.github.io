"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import TextInput from "./textInput";
import SelectApp from "./select";
import { Checkbox, Modal, Radio, Switch } from "antd";
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
        title={<span className="text-black dark:text-white">{t("project_request_title")}</span>}
        centered
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={false}
        width={1000}
        className="my-5 bg-slate-900 "
        classNames={{
          content: "dark:bg-slate-900 rounded-lg !overflow-hidden",
          header: "!bg-transparent dark:!text-white",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            phoneNumber: "",
            cuntry: "",
            province: "",
            city: "",
            projectCategory: {
              title: "",
              value: null,
              cost: null,
            },
            package: {
              title: "",
              value: null,
              cost: NaN,
              relatedQuestionId: null,
            },
            communicationWayData: {
              title: "",
              value: null,
            },
            projectType: {
              title: "",
              id: null,
              cost: NaN,
              switchButton: false,
              answers: [],
            },
            packageAnswer: "",
            packageAnswerCost: NaN,
            relatedQuestion2: [],
          }}
          validationSchema={ValidationContactForm}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setValues }) => (
            <form className="mt-10 flex flex-col dark:text-black">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="pb-1 block dark:text-white">{t("name_hint")}</label>
                  <TextInput placeholder={t("name_hint")} onChange={handleChange} name="fullName" />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("email_hint")}</label>
                  <TextInput placeholder={t("email_hint")} onChange={handleChange} name="email" />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("phone_number_hint")}</label>
                  <TextInput placeholder={t("phone_number_hint")} onChange={handleChange} name="phoneNumber" />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("country_hint")}</label>
                  <TextInput placeholder={t("country_hint")} onChange={handleChange} name="country" />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("province_hint")}</label>
                  <TextInput placeholder={t("province_hint")} onChange={handleChange} name="province" />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("city_hint")}</label>
                  <TextInput placeholder={t("city_hint")} onChange={handleChange} name="city" />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("communication_way_hint")}</label>
                  <SelectApp
                    placeholder={t("communication_way_hint")}
                    options={data?.projectFormDetail?.formQuestions?.communicationWayData?.map((item) => ({
                      label: item.title,
                      value: item.id,
                    }))}
                    allowClear
                    defaultValue={values.communicationWayData?.value}
                    onChange={(e, r: any) => setValues({ ...values, communicationWayData: r })}
                    onClear={() =>
                      setValues({
                        ...values,
                        communicationWayData: {
                          title: "",
                          value: null,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="pb-1 block dark:text-white">{t("project_category_hint")}</label>
                  <SelectApp
                    placeholder={t("project_category_hint")}
                    options={data?.projectFormDetail?.formQuestions?.projectCategory
                      ?.filter((r, i) => i === 0)
                      ?.map((item) => ({
                        label: item.title,
                        value: item.id,
                        cost: item.cost,
                      }))}
                    allowClear
                    onChange={(e, r: any) => setValues({ ...values, projectCategory: r })}
                    defaultValue={values.projectCategory?.value}
                    onClear={() =>
                      setValues({
                        ...values,
                        projectCategory: {
                          title: "",
                          value: null,
                          cost: null,
                        },
                      })
                    }
                  />
                </div>
                {values.projectCategory?.value && values.projectCategory?.value === 1 ? (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("project_package_hint")}</label>
                    <SelectApp
                      placeholder={t("project_package_hint")}
                      options={data?.projectFormDetail?.formQuestions?.projectPackage?.map((item) => ({
                        label: item.title,
                        value: item.id,
                        relatedQuestionId: item.relatedQuestionId,
                        cost: item.cost,
                      }))}
                      allowClear
                      onChange={(e, r: any) =>
                        setValues({
                          ...values,
                          package: r,
                          projectType: {
                            title: "",
                            id: null,
                            cost: NaN,
                            switchButton: false,
                            answers: [],
                          },
                          // @ts-ignore
                          relatedQuestion2: data?.projectFormDetail?.formQuestions?.relatedQuestion2
                            ?.filter((r: any) => r.show)
                            ?.map((r: any) => ({ ...r, value: r.required })),
                          packageAnswer: "",
                          packageAnswerCost: NaN,
                        })
                      }
                      defaultValue={values.package?.value}
                      onClear={() =>
                        setValues({
                          ...values,
                          package: {
                            title: "",
                            value: null,
                            cost: NaN,
                            relatedQuestionId: null,
                          },
                          projectType: {
                            title: "",
                            id: null,
                            cost: NaN,
                            switchButton: false,
                            answers: [],
                          },
                          packageAnswer: "",
                          packageAnswerCost: NaN,
                          relatedQuestion2: [],
                        })
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}

                {values.package?.relatedQuestionId === 1 || values.package?.relatedQuestionId === 3 ? (
                  <>
                    <div>
                      <label className="pb-1 block dark:text-white">Project Type</label>
                      <SelectApp
                        placeholder={t("project_package_related_hint")}
                        options={data?.projectFormDetail?.formQuestions?.[
                          `relatedQuestion${values.package?.relatedQuestionId}`
                          // @ts-ignore
                        ]?.map((item: any) => ({
                          label: item.title,
                          value: item.id,
                          obj: item,
                          disabled: !item.show,
                          // required: false,
                        }))}
                        allowClear
                        value={values.projectType.id}
                        onChange={(e, r: any) =>
                          setValues({ ...values, projectType: r.obj, packageAnswer: "", packageAnswerCost: NaN })
                        }
                        onClear={() =>
                          setValues({
                            ...values,
                            projectType: {
                              title: "",
                              id: null,
                              cost: NaN,
                              switchButton: false,
                              answers: [],
                            },
                            packageAnswer: "",
                            packageAnswerCost: NaN,
                          })
                        }
                      />
                    </div>
                    {values?.projectType?.answers?.length ? (
                      <div className="flex flex-col gap-3">
                        <label className="pb-1 block dark:text-white">Features</label>
                        <Radio.Group
                          onChange={(e) =>
                            setValues({
                              ...values,
                              packageAnswer: e.target.value,
                              // @ts-ignore
                              packageAnswerCost: values.projectType?.[formatText(e.target.value)] || 0,
                            })
                          }
                          value={values.packageAnswer}
                        >
                          {// @ts-ignore
                          values?.projectType?.answers?.map((item: string) => {
                            return (
                              <Radio key={item} value={item}>
                                {item}
                              </Radio>
                            );
                          })}
                        </Radio.Group>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : values.package?.relatedQuestionId === 2 ? (
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    {// @ts-ignore
                    values.relatedQuestion2?.map((item: any) => {
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg p-2 border-slate-200 border"
                        >
                          <div className="w-24 flex items-center gap-1">
                            <span>No</span>
                            <Switch
                              className="bg-[#eee]"
                              checked={item.required ? true : item.value}
                              onChange={(val) =>
                                setValues({
                                  ...values,
                                  relatedQuestion2: values.relatedQuestion2?.map((item2: any) =>
                                    item2?.id === item.id
                                      ? {
                                          ...item2,
                                          value: val,
                                        }
                                      : item2
                                  ) as any,
                                })
                              }
                            />
                            <span>Yes</span>
                          </div>
                          <div>
                            <p>{item.title}</p>
                            <span className="font-medium">
                              ({item.yes} {lng === "en" ? "USD" : lng === "fa" ? "تومان" : ""})
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center justify-between">
                <SubmitBtn className="mt-4 mr-auto">{t("send_btn")}</SubmitBtn>
                <p>
                  Total: {values.projectCategory?.cost || 0 + values.packageAnswerCost || 0 + values.package?.cost || 0}
                </p>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </motion.section>
  );
}
