import React, { memo, useState } from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import { FavoriteBorder, Favorite } from "@mui/icons-material"
import { useLocation } from "react-router-dom"
import { baseApi } from "shared/redux/api"
import { useDispatch } from "react-redux"
import { ICount } from "entities/article/types/types"

const Favorites: React.FC<ICount> = (props: ICount) => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const [method, setMethod] = useState<string>(props.liked ? "DELETE" : "POST")
  const isHoverSupported = useMediaQuery("(hover: hover) and (pointer: fine)")
  const handleLike = () => {
    if (pathname !== "/articles" && !pathname.includes("tag") && !pathname.includes("author")) {
      dispatch(baseApi.util.invalidateTags(["Article"]))
    }
    method === "POST" ? setMethod("DELETE") : setMethod("POST")
    props.onToggleLike({ slug: props.slug, method: props.method || method })
  }

  return (
    <Box sx={{ width: "max-content", height: "100%" }}>
      <label htmlFor={props.slug} className="flex flex-nowrap items-center h-[100%]">
        <Checkbox
          className="text-clamp"
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: isHoverSupported ? "rgba(25, 118, 210, 0.04)" : null,
            },
            "&.Mui-checked": {
              color: "red",
            },
          }}
          icon={
            <FavoriteBorder
              sx={{
                "&.MuiSvgIcon-root": {
                  width: "3vw",
                  maxWidth: "24px",
                  minWidth: "18px",
                },
              }}
            />
          }
          checked={props.liked}
          checkedIcon={
            <Favorite
              color="error"
              className="text-clamp"
              sx={{
                "&.MuiSvgIcon-root": {
                  width: "3vw",
                  maxWidth: "24px",
                  minWidth: "18px",
                },
              }}
            />
          }
          onClick={handleLike}
          id={props.slug}
        />
        <span className={props.className}>{props.count}</span>
      </label>
    </Box>
  )
}
// Favorites.displayName = "Favorites"
export default Favorites
