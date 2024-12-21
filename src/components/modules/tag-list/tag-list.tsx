"use client"

import Tag from "../tag/tag"
import { Box } from "@mui/material"
import { nanoid } from "nanoid"

const TagList: React.FC<{ tagList: string[] }> = ({ tagList }) => {
  return (
    <Box className="flex gap-1 max-w-[100%]">
      {tagList.map(
        (tag) => (tag && tag.length && <Tag key={nanoid()} tag={tag} />) || null
      )}
    </Box>
  )
}
export default TagList
