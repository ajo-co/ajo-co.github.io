import * as Yup from "yup";
import { homeDataType } from "./types";

export const ValidationContactForm = Yup.object().shape({
  email: Yup.string().email("contact_email_valid").required("contact_email_req"),
  message: Yup.string().max(500).min(10, "contact_message_min_valid").required("contact_message_req"),
});

export const ValidationFormRequestForm = (limit: homeDataType["projectFormDetail"]["formConfig"]) =>
  Yup.object().shape({
    email: Yup.string()
      .email("contact_email_valid")
      .when((val, schema) => {
        if (limit?.emailConfig?.show && limit?.emailConfig?.required) return schema.required("contact_email_req");
        return schema;
      }),
    fullName: Yup.string().when((val, schema) => {
      if (limit?.nameConfig?.show && limit?.nameConfig?.required) return schema.required("contact_name_req");
      return schema;
    }),
    phoneNumber: Yup.string()
      .min(11, "phone_number_valid")
      .when((val, schema) => {
        if (limit?.phoneNumberConfig?.show && limit?.phoneNumberConfig?.required)
          return schema.required("phone_number_req");
        return schema;
      }),
    country: Yup.string().when((val, schema) => {
      if (limit?.countryConfig?.show && limit?.countryConfig?.required) return schema.required("country_req");
      return schema;
    }),
    province: Yup.string().when((val, schema) => {
      if (limit?.provinceConfig?.show && limit?.provinceConfig?.required) return schema.required("province_req");
      return schema;
    }),
    city: Yup.string().when((val, schema) => {
      if (limit?.cityConfig?.show && limit?.cityConfig?.required) return schema.required("city_req");
      return schema;
    }),
    communicationWayData: Yup.object().shape({
      value: Yup.number().when((val, schema) => {
        if (limit?.communicationWayConfig?.show && limit?.communicationWayConfig?.required)
          return schema.required("communication_way_req");
        return schema;
      }),
    }),
    projectCategory: Yup.object().shape({
      value: Yup.number().when((val, schema) => {
        if (limit?.projectCategoryConfig?.show && limit?.projectCategoryConfig?.required)
          return schema.required("project_category_req");
        return schema;
      }),
    }),
    package: Yup.object().shape({
      value: Yup.number().when((val, schema) => {
        if (limit?.projectCategoryConfig?.show && limit?.projectCategoryConfig?.required)
          return schema.required("project_package_req");
        return schema;
      }),
    }),
    // projectType: Yup.object().shape({
    //   value: Yup.number().when((val, schema) => {
    //     if (limit?.projectCategoryConfig?.show && limit?.projectCategoryConfig?.required)
    //       return schema.required("additional_description_req");
    //     return schema;
    //   }),
    // }),
  });
