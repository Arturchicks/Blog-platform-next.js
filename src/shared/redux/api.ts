import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react"
import { IArticle } from "../../entities/article"

interface QueryArticles {
  articles: IArticle[]
  articlesCount: number
}
interface QueryArgs {
  offset: number
  tag: string | undefined
}
interface MutationAccount {
  user: {
    username: string
    email: string
    token: string
  }
}
interface User {
  user: { username: string; email: string; password: string }
}
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (localStorage.getItem("token")) {
        headers.set("Authorization", `Token ${localStorage.getItem("token")}`)
      }
      return headers
    },
  }),
  tagTypes: ["Article", "User"],
  endpoints: (builder) => ({
    getArticles: builder.query<QueryArticles, QueryArgs>({
      query: ({ offset, tag }) => (!tag ? `articles?offset=${offset}` : `articles?tag=${tag}`),
      providesTags: ["Article"],
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
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
    }),
    createAccount: builder.mutation<MutationAccount, User>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
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
} = baseApi
