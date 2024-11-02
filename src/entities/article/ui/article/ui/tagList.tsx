import React from "react"
import { IArticle } from "entities/article/types/types"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
export const Tags: React.FC<Pick<IArticle, "tagList">> = ({ tagList }) => {
  return (
    <div className="flex gap-1">
      {tagList &&
        tagList
          .slice(0, 3)
          .filter((e) => e.length)
          .map((e) => (
            <Link
              to={`/articles/${e}`}
              key={nanoid()}
              className="border border-[#00000080] rounded-[4px] font-sans text-[12px] p-[1px] pl-1 pr-1 hover:opacity-70"
            >
              {e}
            </Link>
          ))}
    </div>
  )
}
