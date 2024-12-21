import { Profile } from "@/store/types"
import { BaseQueryFn, TypedMutationTrigger } from "@reduxjs/toolkit/query/react"

export interface SwitchTypes {
  following: boolean
  username: string
  follow: TypedMutationTrigger<Profile, string, BaseQueryFn>
  unfollow: TypedMutationTrigger<Profile, string, BaseQueryFn>
}
