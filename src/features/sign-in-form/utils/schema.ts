import * as yup from "yup"
const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
export const schema = yup
  .object({
    email: yup.string().required("Enter email").matches(regex, "Incorrect email"),
    password: yup.string().required("Enter your password").min(6, "Must be at least 6 charachters"),
  })
  .required()
