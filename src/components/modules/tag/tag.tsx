"use client"
import { setTag } from "@/store/slice"
import { Box } from "@mui/material"
import Link from "next/link"
import { useDispatch } from "react-redux"

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  const dispatch = useDispatch()
  return (
    <Box
      sx={{
        color: "text.secondary",
        borderColor: "text.secondary",
        maxWidth: "25%",
      }}
    >
      <Link
        href={`/articles/tag/${tag}`}
        onClick={() => dispatch(setTag(tag))}
        className="border rounded-[4px] font-sans text-[10px] p-[1px] pl-1 pr-1 max-w-[100%] whitespace-nowrap inline-block overflow-hidden text-ellipsis hover:opacity-50 transition-opacity duration-300"
      >
        {tag}
      </Link>
    </Box>
  )
}
export default Tag
