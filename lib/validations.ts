import * as Yup from "yup";

export const ValidationContactForm = Yup.object().shape({
  email: Yup.string().email("contact_email_valid").required("contact_email_req"),
  message: Yup.string().max(500).min(10, "contact_message_min_valid").required("contact_message_req"),
});
