import React, { SetStateAction, useEffect, useState } from "react"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Favorite from "@mui/icons-material/Favorite"
import { Checkbox } from "@mui/material"
import { nanoid } from "nanoid"
import { useGetArticlesQuery, useSetLikeMutation } from "shared/redux/api"
import { memo } from "react"
type Params = {
  slug: string
  method: string | undefined
}
interface ICount {
  count: number | null
  liked: boolean
  slug: string
  onToggleLike: (params: Params) => void
}
const Favorites: React.FC<ICount> = (props: ICount) => {
  const [method, setMethod] = useState<string>(props.liked ? "DELETE" : "POST")
  const handleLike = () => {
    method === "POST" ? setMethod("DELETE") : setMethod("POST")
    props.onToggleLike({ slug: props.slug, method })
  }
  return (
    <div className="flex gap-1 items-center">
      <Checkbox
        icon={<FavoriteBorder />}
        checked={props.liked}
        checkedIcon={<Favorite style={{ color: "red" }} />}
        onClick={handleLike}
        id={props.slug}
      />
      <span>{props.count}</span>
    </div>
  )
}
export default Favorites
