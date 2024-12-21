import { Author } from "../article/types";

export interface CommentType {
  id: string;
  body: string;
  createdAt: Date;
  author: Author;
  username: string | undefined;
}
