"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { IoMdInformationCircle } from "react-icons/io";

import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import TextInput from "./textInput";
import SelectApp from "./select";
import { Modal, Radio, Switch } from "antd";
import GradientButton from "./gradientBtn";
import { useTranslation } from "@/app/i18n/client";
import { ErrorMessage, Formik } from "formik";
import { ValidationFormRequestForm } from "@/lib/validations";
import { homeDataType } from "@/lib/types";
import emailjs from "@emailjs/browser";
import ModuleInfo from "./moduleInfo";

function formatText(text: string) {
  return text.replace(/-/g, "_").toLowerCase();
}

export default function ProjectRequest({ lng, data }: { lng: string; data: homeDataType | null }) {
  const { ref } = useSectionInView("projectRequest");
  const [openModal, setOpenModal] = useState(false);
  const [openModuleInfoModal, setOpenModuleInfoModal] = useState(false);
  const [moduleInfoData, setModuleInfoData] = useState("");
  const { t } = useTranslation(lng, "home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuresCost, setFeaturesCost] = useState(0);

  const renderRelatedQuestion2Price = (list: any[]) => {
    let price = 0;
    list?.map((item: any) => {
      if (item.value) price += item.yes;
    });
    setFeaturesCost(price);
    // return price;
  };

  console.log(featuresCost);

  const handleShowModuleInfo = (data: string) => {
    setOpenModuleInfoModal(true);
    setModuleInfoData(data);
  };

  const handleHideModuleInfo = () => {
    setOpenModuleInfoModal(false);
    setModuleInfoData("");
  };

  const handleSubmit = async (values: any, callbak: () => void) => {
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! || "nn8t6DHE44KXZpGET");

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID! || "service_ys7lpwd", // Your EmailJS service ID
        process.env.NEXT_PUBLIC_EMAILJS_PROJECT_REQUEST_TEMPLATE_ID! || "template_50y2yi3", // Your EmailJS template ID
        {
          email: values.email,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          province: values.province,
          country: values.country,
          city: values.city,
          projectCategory: values.projectCategory?.label,
          package: values.package?.label,
          communicationWayData: values.communicationWayData?.label,
          projectType: values.projectType?.title,
          packageAnswer: values.packageAnswer,
          estimatedCost: `${
            featuresCost + values.projectCategory?.cost || 0 + values.packageAnswerCost || 0 + values.package?.cost || 0
          } ${lng === "en" ? "USD" : lng === "fa" ? "تومان" : ""}`,
          relatedQuestion2: values.relatedQuestion2?.filter((item: any) => item.value).map((item: any) => item.title),
          to_email: `reza1880z2@gmail.com, ${process.env.NEXT_PUBLIC_EMAIL_HOST_USER || "omidthegreat8@gmail.com"}`, // Your recipient email
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
            country: "",
            province: "",
            city: "",
            projectCategory: {
              title: "",
              value: null,
              cost: NaN,
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
          validationSchema={ValidationFormRequestForm(
            data?.projectFormDetail?.formConfig as homeDataType["projectFormDetail"]["formConfig"]
          )}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleSubmit(values, () => resetForm());
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setValues }) => (
            <form className="mt-10 flex flex-col dark:text-black">
              <div className="grid grid-cols-2 gap-5">
                {data?.projectFormDetail?.formConfig?.nameConfig?.show && (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("name_hint")}</label>
                    <TextInput placeholder={t("name_hint")} onChange={handleChange} name="fullName" />
                    {touched.fullName && (
                      <ErrorMessage
                        name="fullName"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.emailConfig?.show && (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("email_hint")}</label>
                    <TextInput placeholder={t("email_hint")} onChange={handleChange} name="email" />
                    {touched.email && (
                      <ErrorMessage
                        name="email"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.phoneNumberConfig?.show && (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("phone_number_hint")}</label>
                    <TextInput placeholder={t("phone_number_hint")} onChange={handleChange} name="phoneNumber" />
                    {touched.phoneNumber && (
                      <ErrorMessage
                        name="phoneNumber"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.countryConfig?.show && (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("country_hint")}</label>
                    <TextInput placeholder={t("country_hint")} onChange={handleChange} name="country" />
                    {touched.country && (
                      <ErrorMessage
                        name="country"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.provinceConfig?.show && (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("province_hint")}</label>
                    <TextInput placeholder={t("province_hint")} onChange={handleChange} name="province" />
                    {touched.province && (
                      <ErrorMessage
                        name="province"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.cityConfig?.show && (
                  <div>
                    <label className="pb-1 block dark:text-white">{t("city_hint")}</label>
                    <TextInput placeholder={t("city_hint")} onChange={handleChange} name="city" />
                    {touched.city && (
                      <ErrorMessage
                        name="city"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.communicationWayConfig?.show && (
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
                    {touched.communicationWayData && (
                      <ErrorMessage
                        name="communicationWayData.value"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.projectCategoryConfig?.show && (
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
                            cost: NaN,
                          },
                        })
                      }
                    />
                    {touched.communicationWayData && (
                      <ErrorMessage
                        name="projectCategory.value"
                        render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                      />
                    )}
                  </div>
                )}
                {data?.projectFormDetail?.formConfig?.projectPackageConfig?.show &&
                  (values.projectCategory?.value && values.projectCategory?.value === 1 ? (
                    <div>
                      <label className="pb-1 block dark:text-white">{t("project_package")}</label>
                      <SelectApp
                        placeholder={t("project_package")}
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
                      {touched.communicationWayData && (
                        <ErrorMessage
                          name="package.value"
                          render={(text) => <span className="!text-red-600 pt-1 text-xs">{t(text)}</span>}
                        />
                      )}
                    </div>
                  ) : (
                    <></>
                  ))}

                {values.package?.relatedQuestionId === 1 || values.package?.relatedQuestionId === 3 ? (
                  <>
                    {data?.projectFormDetail?.formConfig?.additionalDescriptionConfig?.show && (
                      <div>
                        <label className="pb-1 block dark:text-white">{t("additional_description")}</label>
                        <SelectApp
                          placeholder={t("additional_description")}
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
                    )}

                    {values?.projectType?.answers?.length ? (
                      <div className="flex flex-col gap-3">
                        <label className="pb-1 block dark:text-white">{values.projectType?.title}</label>
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
                                <span className="dark:text-white">{item}</span>
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
                            <span>{t("no")}</span>
                            <Switch
                              className="bg-[#eee]"
                              checked={item.required ? true : item.value}
                              onChange={(val) => {
                                const finalRes = values.relatedQuestion2?.map((item2: any) =>
                                  item2?.id === item.id
                                    ? {
                                        ...item2,
                                        value: val,
                                      }
                                    : item2
                                );
                                console.log(finalRes);

                                renderRelatedQuestion2Price(finalRes);
                                setValues({
                                  ...values,
                                  relatedQuestion2: finalRes as any,
                                });
                              }}
                            />
                            <span>{t("yes")}</span>
                          </div>
                          <div className="flex-grow">
                            <p>{item.title}</p>
                            <span className="font-medium">
                              ({item.yes} {lng === "en" ? "USD" : lng === "fa" ? "تومان" : ""})
                            </span>
                          </div>
                          <div>
                            <button type="button" onClick={() => handleShowModuleInfo(item?.description)}>
                              <IoMdInformationCircle size={24} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center justify-between w-full mt-3">
                <SubmitBtn className="mt-4 mr-auto" loading={isSubmitting} onClick={handleSubmit}>
                  {t("send_btn")}
                </SubmitBtn>
                <p className="dark:text-white w-full dark:text-left ltr:!text-right pt-3 text-base">
                  {t("estimated_cost_hint")}:{" "}
                  {featuresCost + values.projectCategory?.cost ||
                    0 + values.packageAnswerCost ||
                    0 + values.package?.cost ||
                    0}{" "}
                  {lng === "en" ? "USD" : lng === "fa" ? "تومان" : ""}
                </p>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
      <Modal
        // title={<span className="text-black dark:text-white">{t("project_request_title")}</span>}
        centered
        open={openModuleInfoModal}
        onClose={() => handleHideModuleInfo()}
        onCancel={() => handleHideModuleInfo()}
        footer={false}
        width={1000}
        className="my-5 bg-slate-900 "
        classNames={{
          content: "dark:bg-slate-900 rounded-lg !overflow-hidden",
          header: "!bg-transparent dark:!text-white",
        }}
      >
        <ModuleInfo content={moduleInfoData} />
      </Modal>
    </motion.section>
  );
}
