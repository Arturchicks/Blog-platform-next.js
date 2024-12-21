import * as yup from "yup";

export const schema = yup.object({
  username: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  manual: yup.string(),
});
