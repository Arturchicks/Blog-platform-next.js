import React from "react";
import { IArticle } from "../model/types";
import { formatDate } from "../lib/formatDate";
const Article: React.FC<IArticle> = (props: IArticle) => {
  return (
    <div className="flex w-[70vw]">
      <div className="flex w-[100%] justify-between">
        <div>
          <h3>{props.title}</h3>
          <span>{props.favoritesCount}</span>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <span>{props.author.username}</span>
            <span>{formatDate(props.createdAt)}</span>
          </div>
          <img src={props.author.image} alt="avatar" className="w-7" />
        </div>
      </div>
    </div>
  );
};
export default Article;
