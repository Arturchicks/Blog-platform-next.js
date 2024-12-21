import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ArticleType } from "@/components/modules/article/types"
import {
  Account,
  MutationArticle,
  MutationCreateAccount,
  Params,
  Profile,
  QueryArticle,
  QueryComments,
  QueryUser,
} from "./types"
import { SignInType } from "@/app/sign-in/types"

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api/",
    prepareHeaders: (headers) => {
      if (localStorage.getItem("token")) {
        headers.set("Authorization", `Token ${localStorage.getItem("token")}`)
      }
      return headers
    },
  }),
  tagTypes: ["Article", "User", "ArticlePage", "Comments", "Profile"],
  endpoints: (builder) => ({
    getArticle: builder.query<QueryArticle, string | undefined | string[]>({
      query: (slug) => `articles/${slug}`,
      providesTags: ["ArticlePage"],
    }),
    getCurrentUser: builder.query<QueryUser, null>({
      query: () => "/user",
      providesTags: ["User"],
    }),
    loginUser: builder.mutation<QueryUser, { user: SignInType }>({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Article", "User"],
    }),
    setLike: builder.mutation<QueryArticle, Params>({
      query: ({ slug, method }) => ({
        url: `articles/${slug}/favorite`,
        method,
      }),
      invalidatesTags: ["ArticlePage"],
    }),
    createAccount: builder.mutation<MutationCreateAccount, Account>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [
        "User",
        "Article",
        "Comments",
        "Profile",
        "ArticlePage",
      ],
    }),
    createArticle: builder.mutation<ArticleType, MutationArticle>({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation<null, string | undefined>({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
    updateArticle: builder.mutation<ArticleType, MutationArticle>({
      query: ({ slug, article }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        body: { article },
      }),
      invalidatesTags: ["Article", "ArticlePage"],
    }),
    getComments: builder.query<QueryComments, string>({
      query: (slug) => `articles/${slug}/comments`,
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation({
      query: ({ slug, comment }) => ({
        url: `articles/${slug}/comments`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: ["ArticlePage", "Comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ id, slug }) => ({
        url: `articles/${slug}/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ArticlePage", "Comments"],
    }),
    getProfile: builder.query<Profile, string | undefined>({
      query: (username) => `profiles/${username}`,
      providesTags: ["Profile"],
    }),
    followUser: builder.mutation<Profile, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    unfollowUser: builder.mutation<Profile, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
})
export const {
  useSetLikeMutation,
  useCreateAccountMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useEditProfileMutation,
  useUpdateArticleMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = baseApi
