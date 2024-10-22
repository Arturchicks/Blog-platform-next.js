import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle } from "../../entities/article";
interface QueryArticles {
  articles: IArticle[];
  articlesCount: number;
}
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog-platform.kata.academy/api/" }),
  endpoints: (builder) => ({
    getArticles: builder.query<QueryArticles, string>({
      query: (articles) => `${articles}/`,
    }),
  }),
});
export const { useGetArticlesQuery } = baseApi;
