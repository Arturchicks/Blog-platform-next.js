"use client"

import Articles from "@/app/page"
import { useParams } from "next/navigation"

const ArticlesByTag = () => {
  const { tag } = useParams()
  return <Articles query="tag" value={tag} />
}
export default ArticlesByTag
