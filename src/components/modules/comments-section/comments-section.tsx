"use client";

import { Box, Button } from "@mui/material";
import { createRef, Ref } from "react";
import { CommentType } from "../comment/types";
import CommentHeader from "./comments-header";
import { QueryComments } from "@/store/types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Comment from "../comment/comment";
import AddComment from "./add-comment";

const CommentsSection: React.FC<{
  comments: Array<Omit<CommentType, "username">>;
  username: string | undefined;
  commentsQuantity: number;
  handleQuantity: () => void;
}> = ({ comments, username, commentsQuantity, handleQuantity }) => {
  return (
    <section className="min-h-40">
      <Box
        className="text-[20px] font-extralight flex flex-col items-start"
        sx={{ color: "text.primary" }}
      >
        <CommentHeader length={comments.length || 0} />
        <Box className="w-full flex flex-col gap-3">
          <TransitionGroup className="flex flex-col gap-3">
            {comments
              .map((e: Omit<CommentType, "username">) => {
                const ref = createRef() as Ref<any>;
                return (
                  <CSSTransition
                    nodeRef={ref}
                    in={!!e.id}
                    timeout={300}
                    key={e.id}
                    classNames="display"
                    unmountOnExit
                  >
                    <Comment username={username} {...e} ref={ref} />
                  </CSSTransition>
                );
              })
              .reverse()
              .slice(0, commentsQuantity)}
          </TransitionGroup>
        </Box>
        {comments && comments.length > 5 && (
          <Button
            variant="text"
            color="info"
            sx={{ width: "100%" }}
            onClick={handleQuantity}
          >
            {comments.length > commentsQuantity ? "Показать все" : "Скрыть"}
          </Button>
        )}
      </Box>
      <AddComment data={Boolean(username)} />
    </section>
  );
};
export default CommentsSection;
