"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import FormField from "@/components/modules/form-field/form-field";
import { ColorButton } from "@/components/UI/color-button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./utils/schema";
import { SignInType } from "./types";
import { useDispatch } from "react-redux";
import { setLogIn } from "@/store/slice";
import { useLoginUserMutation } from "@/store/api";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/navigation";

const SignInForm = (): JSX.Element => {
  const [mount, setMount] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [login] = useLoginUserMutation();
  const ref = useRef(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInType>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (user) => {
    try {
      const { data, error } = await login({ user });
      if (data) {
        dispatch(setLogIn(data.user.token));
        router.push("/");
      } else if (error) {
        setError("email", { message: "Invalid email or password" });
        setError("password", { message: "" });
      }
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);

  return (
    <CSSTransition
      in={mount}
      nodeRef={ref}
      timeout={400}
      classNames="display"
      unmountOnExit
    >
      <Box
        ref={ref}
        className="mt-12 flex flex-col xs:w-[286px] sm:w-[385px] mx-auto rounded-lg p-8 gap-4"
        sx={{ bgcolor: "primary.main", color: "secondary.main" }}
      >
        <span className="text-center text-[20px]">Sign In</span>
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <Box className="flex flex-col gap-4">
            <FormField register={register} id="email" errors={errors.email} />
            <FormField
              register={register}
              id="password"
              errors={errors.password}
            />
          </Box>
          <ColorButton variant="contained" className="h-11" type="submit">
            Login
          </ColorButton>
        </form>
        <Box className="text-[12px] flex gap-2 justify-center text-[#8C8C8C]">
          Do not have an account?
          <Link
            href="/sign-up"
            className="text-[#1890FF] underline hover:opacity-50"
          >
            Sign Up
          </Link>
        </Box>
      </Box>
    </CSSTransition>
  );
};

export default SignInForm;
