import * as yup from "yup"
export const tagSchema = yup
  .object({
    tagList: yup.array().of(yup?.string().required("Add tag")),
  })
  .required()
