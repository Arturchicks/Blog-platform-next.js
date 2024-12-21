import { ArticleType, Author } from "@/components/modules/article/types"
import { CommentType } from "@/components/modules/comment/types"

export interface QueryArticles {
  articles: Array<ArticleType>
  articlesCount: number
}

export interface QueryArgs {
  offset?: number
  tag?: string | undefined
  username?: string | undefined
}

export interface QueryArticle {
  article: ArticleType
}

export interface QueryUser {
  user: { username: string; email: string; token: string; image?: string }
}
// export interface QueryUser {
//   user: {
//     username: string | undefined;
//     email: string;
//     token: string;
//     image?: string;
//   };
// }

export interface MutationArticle {
  slug?: string | string[]
  article: {
    title: string
    description: string
    body: string
    tagList?: string[]
  }
}
export interface Params {
  slug: string
  method: string | undefined
}
export interface MutationCreateAccount {
  data: {
    user?: {
      username?: string
      email?: string
      token?: string
    }
  }
  error?: {
    errors: {
      username?: string
      email?: string
      password?: string
    }
  }
}

export interface Account {
  user: { username: string; email: string; password?: string; image?: string }
}
export interface Profile {
  profile: Author
}
export interface QueryComments {
  comments: Array<Omit<CommentType, "username">>
}
