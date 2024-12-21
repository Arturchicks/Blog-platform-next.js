"use client"

import Articles from "@/app/page"
import { useParams } from "next/navigation"

const ArticlesByUsername = () => {
  const { author } = useParams()
  return <Articles query="author" value={author} />
}
export default ArticlesByUsername
