import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react"
import { MutationAccount, User, MutationArticle, Article, QueryArticles, MutationLike, QueryUser } from "./types"
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
  tagTypes: ["Article", "User", "ArticlePage"],
  endpoints: (builder) => ({
    getArticles: builder.query<QueryArticles, QueryArgs>({
      query: ({ offset, tag }) => (!tag ? `articles?offset=${offset}` : `articles?tag=${tag}`),
      providesTags: ["Article"],
    }),
    getArticle: builder.query({
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
      invalidatesTags: ["User"],
    }),
    createArticle: builder.mutation<MutationArticle, Article>({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
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
} = baseApi
