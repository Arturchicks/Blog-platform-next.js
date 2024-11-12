import * as yup from "yup"

export const schema = yup.object().shape(
  {
    username: yup.string(),
    email: yup.string().email("Incorrect email"),
    password: yup.string().when("password", {
      is: (value: string) => value?.length,
      then: (rule) => rule.min(6, "Must be at least 6 charachters"),
    }),
    imageUrl: yup.string(),
    manual: yup.string(),
    image: yup.string(),
  },
  [["password", "password"]]
)
