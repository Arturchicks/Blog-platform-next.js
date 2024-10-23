import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { IArticle } from "../../entities/article";
import Article from "../../entities/article/ui/article/Article";
import { useGetArticlesQuery } from "../../shared/redux/api";
const URL = "https://blog-platform.kata.academy/api/articles";

const Articles: React.FC = () => {
  const { data, error, isLoading } = useGetArticlesQuery("articles");
  return (
    <div className="flex flex-col gap-6 w-[70vw] mx-auto">
      {data && data.articles.map((e: IArticle) => <Article key={nanoid()} {...e} />)}
    </div>
  );
};
export default Articles;
