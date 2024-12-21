"use client";
import { Box, Button, Theme } from "@mui/material";
import { forwardRef } from "react";
import Markdown from "react-markdown";
import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";
import { useTheme } from "@emotion/react";
import { CommentType } from "./types";
import { useDeleteCommentMutation } from "@/store/api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { mdImgEncode } from "@/utils/helpers/md-img-encode";
import Data from "../data/data";

const Comment = forwardRef<HTMLDivElement, CommentType>(function Comment(
  props,
  ref
) {
  const router = useRouter();
  const { author, username, body } = props;
  const { slug } = useParams();
  const [deleteComment] = useDeleteCommentMutation();
  const theme = useTheme() as Theme;
  const markdown = mdImgEncode(body);
  const handleDeleteComment = async ({ id }: CommentType) => {
    await deleteComment({ id, slug });
  };

  return (
    <Box
      ref={ref}
      className={clsx(
        "flex gap-3 items-center p-3 border-l-[2px]",
        theme.palette.mode === "dark" && "border-[#787879]"
      )}
    >
      <Button
        className="self-start"
        sx={{ minWidth: "46px", padding: 0 }}
        onClick={() => router.push(`/profile/${author.username}`)}
      >
        <img
          src={author.image}
          alt="avatar"
          width={46}
          height={46}
          className="ImgXs rounded-[50%] border-[2px] border-solid border-[#1890FF] hover:opacity-50 transition-opacity duration-300"
        />
      </Button>
      <div>
        <div className="flex gap-2 ">
          <span className="text-[16px]">{author.username}</span>
          <Data data={props.createdAt} className="pt-1" />
          {author.username === username && (
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
        <Markdown
          className="text-[14px] m-0 markdown"
          components={{
            img: ({ src, alt }) => {
              return (
                <img
                  src={decodeURIComponent(src)}
                  alt={alt}
                  width={500}
                  height={500}
                />
              );
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </Box>
  );
});

export default Comment;
