import React from "react";
import { IArticle } from "../../model/types";
import { formatDate } from "../../lib/formatDate";
import Favorites from "./ui/favorites";
const Article: React.FC<IArticle> = (props: IArticle) => {
  return (
    <div className="flex flex-col justify-between w-[70vw] h-[140px] bg-white rounded-xl p-[10px] font-sans">
      <div className="flex w-[100%] justify-between">
        <div className="flex gap-2">
          <h3 className="text-[#f0f4f7] text-xl">{props.title}</h3>
          <Favorites count={props.favoritesCount} />
        </div>
        <div className="flex h-[46px] gap-2">
          <div className="flex flex-col text-right">
            <span>{props.author.username}</span>
            <span>{formatDate(props.createdAt)}</span>
          </div>
          <img src={props.author.image} alt="avatar" className="w-[46px] h-[46px] rounded-[50%]" />
        </div>
      </div>
      <div>
        <p>{props.description}</p>
      </div>
    </div>
  );
};
export default Article;
