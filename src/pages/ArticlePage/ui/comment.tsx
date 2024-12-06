import { Box, Button, Theme } from "@mui/material"
import { format } from "date-fns"
import { forwardRef } from "react"
import { useParams } from "react-router-dom"
import { useDeleteCommentMutation, useGetCommentsQuery } from "shared/redux/api"
import { CommentType } from "shared/redux/types"
import Markdown from "react-markdown"
import DeleteIcon from "@mui/icons-material/Delete"
import clsx from "clsx"
import { useTheme } from "@emotion/react"

const Comment = forwardRef<HTMLDivElement, CommentType>(function MyComment(props, ref) {
  const { slug } = useParams()
  const [deleteComment] = useDeleteCommentMutation()
  const { refetch } = useGetCommentsQuery(`${slug}`)
  const theme = useTheme() as Theme
  const handleDeleteComment = async (e: CommentType) => {
    const { error } = await deleteComment({ id: e.id, slug })
    !error && refetch()
  }
  return (
    <div
      ref={ref}
      className={clsx(
        "flex gap-3 items-center p-3 border-l-[2px]",
        theme.palette.mode === "dark" && "border-[#787879]"
      )}
    >
      <img
        src={props.author.image}
        alt="avatar"
        className="min-w-[46px] w-[46px] h-[46px] rounded-[50%] self-start gradient-box"
      />
      <div>
        <div className="flex gap-2">
          <span className="text-[16px]">{props.author.username}</span>
          <Box sx={{ fontSize: 12, lineHeight: "24px", alignSelf: "baseline", color: "text.primary" }}>
            {format(props.createdAt, "PP")}
          </Box>
          {props.author.username === props.username && (
            <Button
              variant="text"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteComment(props)}
              sx={{
                fontSize: "10px",
                textTransform: "capitalize",
                "&.MuiButton-root": { minWidth: "30px" },
                "& .MuiButton-startIcon": {
                  margin: 0,
                },
              }}
            />
          )}
        </div>
        <Markdown className="text-[14px] m-0 markdown">{props.body}</Markdown>
      </div>
    </div>
  )
})

export default Comment
