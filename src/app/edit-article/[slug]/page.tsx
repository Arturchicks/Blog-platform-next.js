"use client"
import ArticleForm from "@/components/article-form/article-form"
import { useUpdateArticleMutation } from "@/store/api"

const EditArticle = () => {
  const [update] = useUpdateArticleMutation()
  return <ArticleForm type="Edit" action={update} />
}
export default EditArticle
