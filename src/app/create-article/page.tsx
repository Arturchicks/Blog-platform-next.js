"use client"
import ArticleForm from "@/components/article-form/article-form"
import { useCreateArticleMutation } from "@/store/api"

const CreateArticle = () => {
  const [create] = useCreateArticleMutation()
  return <ArticleForm type="Create new" action={create} />
}
export default CreateArticle
