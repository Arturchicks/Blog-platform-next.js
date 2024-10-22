import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { IArticle } from "../../entities/article";
import Article from "../../entities/article/ui/Article";
import { useGetArticlesQuery } from "../../shared/redux/api";
const URL = "https://blog-platform.kata.academy/api/articles";

const Articles: React.FC = () => {
  const { data, error, isLoading } = useGetArticlesQuery("articles");
  if (data) console.log(data);
  return <div>{data && data.articles.map((e: IArticle) => <Article key={nanoid()} {...e} />)}</div>;
};
export default Articles;
