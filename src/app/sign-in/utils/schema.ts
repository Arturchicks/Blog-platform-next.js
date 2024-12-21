import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().email().required("Enter email"),
  password: yup
    .string()
    .required("Enter password")
    .min(6, "Must be at least 6 charachters"),
});
