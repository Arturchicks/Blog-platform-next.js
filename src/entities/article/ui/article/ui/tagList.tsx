import React from "react"
import { IArticle } from "entities/article/types/types"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { baseApi } from "shared/redux/api"
export const Tags: React.FC<Pick<IArticle, "tagList">> = ({ tagList }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex gap-1">
      {tagList &&
        tagList
          .slice(0, 3)
          .filter((e) => e.length)
          .map((e) => (
            <Link
              to={`/articles/tag/${e}`}
              key={nanoid()}
              onClick={() => dispatch(baseApi.util.invalidateTags(["Article"]))}
              className="border border-[#00000080] text-[#00000080] rounded-[4px] font-sans text-[12px] p-[1px] pl-1 pr-1 hover:opacity-70"
            >
              {e}
            </Link>
          ))}
    </div>
  )
}
