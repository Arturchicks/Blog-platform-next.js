import { baseApi } from "@/store/api";
import { setLogOut } from "@/store/slice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch } from "react";
import { UnknownAction } from "redux";

export const handleLogOut = (
  router: AppRouterInstance,
  dispatch: Dispatch<UnknownAction>
) => {
  router.push("/");
  dispatch(setLogOut());
  dispatch(baseApi.util.resetApiState());
};
