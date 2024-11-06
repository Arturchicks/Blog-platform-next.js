import React, { useState } from "react"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Favorite from "@mui/icons-material/Favorite"
import { Box, Checkbox } from "@mui/material"

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
    <Box>
      <label htmlFor={props.slug}>
        <Checkbox
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
            },
            "&.Mui-checked": {
              color: "red",
            },
            "&. MuiCheckbox-indeterminate": {
              color: "red",
            },
          }}
          icon={<FavoriteBorder />}
          checked={props.liked}
          checkedIcon={<Favorite color="error" />}
          onClick={handleLike}
          id={props.slug}
        />
        <span>{props.count}</span>
      </label>
    </Box>
  )
}
export default Favorites
