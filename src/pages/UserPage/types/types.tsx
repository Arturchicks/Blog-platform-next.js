import { BaseQueryFn, TypedMutationTrigger } from "@reduxjs/toolkit/dist/query/react"
import { Profile } from "shared/redux/types"

export interface SwitchTypes {
  following: boolean
  username: string
  follow: TypedMutationTrigger<Profile, string, BaseQueryFn>
  unfollow: TypedMutationTrigger<Profile, string, BaseQueryFn>
}
