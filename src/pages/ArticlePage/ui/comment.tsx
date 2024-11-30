import { Box, Button } from "@mui/material"
import { format } from "date-fns"
import React, { memo, useState } from "react"
import { useParams } from "react-router-dom"
import { useDeleteCommentMutation, useGetCommentsQuery } from "shared/redux/api"
import { CommentType } from "shared/redux/types"
import Markdown from "react-markdown"
import DeleteIcon from "@mui/icons-material/Delete"
import clsx from "clsx"
import { debounce } from "shared/lib/debounce"

const Comment: React.FC<CommentType> = memo((props: CommentType): JSX.Element => {
  const { slug } = useParams()
  const [deleteComment] = useDeleteCommentMutation()
  const { refetch } = useGetCommentsQuery(`${slug}`)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const handleDeleteComment = async (e: CommentType) => {
    const { error } = await deleteComment({ id: e.id, slug })
    !error && refetch()
  }
  const debounced = debounce(handleDeleteComment, 300)
  return (
    <div className={clsx("flex gap-3 items-center p-3", isDeleted ? "animate-vanish" : "animate-display")}>
      <img src={props.author.image} alt="avatar" className="w-[46px] h-[46px] rounded-[50%] self-start" />
      <div>
        <div className="flex gap-2">
          <span>{props.author.username}</span>
          <Box sx={{ fontSize: 12, lineHeight: "24px", alignSelf: "baseline", color: "text.primary" }}>
            {format(props.createdAt, "PP")}
          </Box>
          {props.author.username === props.username && (
            <Button
              variant="text"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setIsDeleted(true)
                debounced(props)
              }}
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
Comment.displayName = "Comment"
export default Comment
