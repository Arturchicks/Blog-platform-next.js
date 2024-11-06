import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { LoginForm } from "features/sign-in-form"
import { Articles } from "pages/Articles"
import { AuthForm } from "features/sign-up-form"
import CreateArticle from "pages/createArticle/createArticle"
import { ArticlePage } from "pages/ArticlePage/article-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Articles />,
      },
      {
        path: "articles",
        element: <Articles />,
        children: [
          {
            path: "tag/:tag",
            element: <Articles />,
          },
        ],
      },
      {
        path: "sign-in",
        element: <LoginForm />,
      },
      {
        path: "sign-up",
        element: <AuthForm />,
      },
      {
        path: "create-article",
        element: <CreateArticle />,
      },
      {
        path: "slug/:slug",
        element: <ArticlePage />,
      },
    ],
  },
])
