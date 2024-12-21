import { CommentType } from "../comment/types";

export interface CommensSectionType {
  comments: Array<Omit<CommentType, "username">>;
  username: string | undefined;
  commentsQuantity: number;
  handleQuantity: () => void;
}
