export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  favorited: false;
  favoritesCount: number;
  author: Author;
}
