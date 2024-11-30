import * as yup from "yup"

export const schema = yup.object().shape({
  body: yup.string(),
  image: yup.string(),
  imageHash: yup.string(),
})
