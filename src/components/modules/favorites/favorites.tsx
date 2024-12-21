"use client";
import React, { useState } from "react";
import { Box, Checkbox, useMediaQuery } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { baseApi } from "@/store/api";
import { useDispatch } from "react-redux";
import { FavoritesType } from "./types";
import { usePathname } from "next/navigation";

const Favorites: React.FC<FavoritesType> = ({
  liked,
  onToggleLike,
  slug,
  count,
  className,
}: FavoritesType) => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [method, setMethod] = useState<string>(liked ? "DELETE" : "POST");
  const isHoverSupported = useMediaQuery("(hover: hover) and (pointer: fine)");
  const handleLike = async () => {
    if (path !== "/" && !path.includes("tag") && !path.includes("author")) {
      dispatch(baseApi.util.invalidateTags(["Article"]));
    }
    setMethod((prev) => (prev === "POST" ? "DELETE" : "POST"));
    onToggleLike({ slug, method });
  };

  return (
    <Box sx={{ width: "max-content", height: "100%" }}>
      <Box className="flex flex-nowrap items-center h-[100%]">
        <label htmlFor={slug}>
          <Checkbox
            className={className}
            sx={{
              "&:hover": {
                backgroundColor: isHoverSupported
                  ? "rgba(25, 118, 210, 0.04)"
                  : null,
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

                  color: "gray",
                }}
              />
            }
            checked={liked}
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
            id={slug}
          />
        </label>
        <Box
          className="inline-block min-w-3 text-clamp pb-[2px]"
          sx={{ color: "text.primary" }}
        >
          {count}
        </Box>
      </Box>
    </Box>
  );
};
export default Favorites;
