import * as yup from "yup"
export const schema = yup.object({
  title: yup.string().max(100, "No more").required("required"),
  description: yup.string().max(150, "No more").required("required"),
  text: yup.string().required("Enter text"),
  tag: yup.string().required(),
})
