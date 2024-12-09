import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  MutationAccount,
  User,
  MutationArticle,
  Article,
  QueryArticles,
  MutationLike,
  QueryUser,
  QueryArticle,
  CommentsType,
  Profile,
} from "./types"
import { QueryArgs } from "./types"
import { Params } from "./types"

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
    getArticles: builder.query<QueryArticles, QueryArgs>({
      query: ({ offset, tag, username }) =>
        !tag ? (!username ? `articles?offset=${offset}` : `articles?author=${username}`) : `articles?tag=${tag}`,
      providesTags: ["Article"],
    }),
    getArticle: builder.query<QueryArticle, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: ["ArticlePage"],
    }),
    getCurrentUser: builder.query<QueryUser, null>({
      query: (arg: null) => "/user",
      providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Article"],
    }),
    setLike: builder.mutation<MutationLike, Params>({
      query: ({ slug, method }) => ({
        url: `articles/${slug}/favorite`,
        method,
      }),
      invalidatesTags: ["ArticlePage"],
    }),
    createAccount: builder.mutation<MutationAccount, User>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    editProfile: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User", "Article", "Comments", "Profile", "ArticlePage"],
    }),
    createArticle: builder.mutation<MutationArticle, Article>({
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
    updateArticle: builder.mutation({
      query: ({ slug, data }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        body: { article: data },
      }),
      invalidatesTags: ["Article", "ArticlePage"],
    }),
    getComments: builder.query({
      query: (slug) => `articles/${slug}/comments`,
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation({
      query: ({ slug, data }) => ({
        url: `articles/${slug}/comments`,
        method: "POST",
        body: data,
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
  useGetArticlesQuery,
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
