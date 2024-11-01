import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
export const schema = yup
  .object({
    username: yup.string().required("Username is a required field"),
    email: yup.string().required("Enter email").matches(regex, "Incorrect email"),
    password: yup.string().min(6, "Must be at least 6 charachters").required(),
    repeat: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required("Repeat password"),
  })
  .required()
