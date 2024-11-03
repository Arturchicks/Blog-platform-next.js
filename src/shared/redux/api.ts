import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { QueryArticles, QueryArgs, MutationAccount, User, MutationArticle, Article } from "./types"

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
    getArticles: builder.query({
      query: ({ offset, tag }) => (!tag ? `articles?offset=${offset}` : `articles?tag=${tag}`),
      providesTags: ["Article"],
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: ["ArticlePage"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Article"],
    }),
    getCurrentUser: builder.query({
      query: () => "/user",
    }),
    setLike: builder.mutation({
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
    createArticle: builder.mutation<MutationArticle, Article>({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
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
} = baseApi
