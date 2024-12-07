import * as yup from "yup"
export const schema = yup.object({
  bio: yup.string().required("Add bio"),
})
