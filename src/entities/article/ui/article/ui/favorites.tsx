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
    setMethod((prev) => (prev === "POST" ? "DELETE" : "POST"))
    props.onToggleLike({ slug: props.slug, method: props.method || method })
  }

  return (
    <Box sx={{ width: "max-content", height: "100%" }}>
      <Box className="flex flex-nowrap items-center h-[100%]">
        <label htmlFor={props.slug}>
          <Checkbox
            className={props.className}
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
                className="text-clamp an"
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
        </label>
        <span className="inline-block min-w-3 text-clamp">{props.count}</span>
      </Box>
    </Box>
  )
}
export default Favorites
