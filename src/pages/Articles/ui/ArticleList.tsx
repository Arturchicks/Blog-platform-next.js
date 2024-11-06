import React, { useCallback, useLayoutEffect, useMemo, useState, useRef } from "react"
import { nanoid } from "nanoid"
import { IArticle } from "../../../entities/article"
import Article from "../../../entities/article/ui/article/Article"
import { useGetArticlesQuery } from "../../../shared/redux/api"
import { Pagination } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"
export const ArticleList: React.FC = () => {
  const [offSet, setOffSet] = useState<number>(0)
  const { tag } = useParams()
  const { data, isLoading } = useGetArticlesQuery({ offset: offSet, tag: tag })
  const page = useRef<number>(1)
  const [count, setCount] = useState<number>(0)

  const handlePage = useCallback((e: React.ChangeEvent<unknown>, value: number) => {
    setOffSet((value - 1) * 20)
    page.current = value
  }, [])
  useLayoutEffect(() => {
    if (data) {
      setCount(Math.floor(data?.articlesCount / 20))
      window.scrollTo(0, 0)
    }
  }, [data])
  const articles = useMemo(() => {
    return data?.articles.map((article: IArticle) => <Article {...article} key={nanoid()} />)
  }, [data])

  return (
    <Box className="flex flex-col items-center">
      {isLoading && <CircularProgress />}
      {data && (
        <>
          <div className="flex flex-col gap-6 w-[70vw]">{articles}</div>
          {count > 1 && (
            <Pagination count={count} className="flex justify-center mt-2" onChange={handlePage} page={page.current} />
          )}
        </>
      )}
    </Box>
  )
}
