import React, { useCallback, useLayoutEffect, useMemo, useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import { IArticle } from "../../../entities/article"
import Article from "../../../entities/article/ui/article/Article"
import { baseApi, useGetArticlesQuery } from "../../../shared/redux/api"
import { Pagination, useMediaQuery } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { useLocation, useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import { useDispatch } from "react-redux"

export const ArticleList: React.FC = () => {
  const [offSet, setOffSet] = useState<number>(0)
  const { tag } = useParams()
  const page = useRef<number>(1)
  const [count, setCount] = useState<number>(0)
  const { pathname } = useLocation()
  const [location, setLocation] = useState<string>(pathname)
  const isPointer = useMediaQuery("(pointer: fine)")
  const [state, setState] = useState<boolean>(false)
  const { data, isLoading } = useGetArticlesQuery({ offset: offSet, tag: tag })
  const dispatch = useDispatch()
  const handlePage = useCallback((e: React.ChangeEvent<unknown>, value: number) => {
    setOffSet((value - 1) * 20)
    page.current = value
  }, [])
  console.log("articles")
  useLayoutEffect(() => {
    if (data) {
      setCount(Math.floor(data?.articlesCount / 20))
      window.scrollTo(0, 0)
    }
  }, [data])

  useEffect(() => {
    setLocation((prev) => {
      if (prev !== pathname) {
        dispatch(baseApi.util.invalidateTags(["Article"]))
      }
      return pathname
    })
    return () => {
      if (state) dispatch(baseApi.util.invalidateTags(["Article"]))
    }
  }, [state, pathname])

  const articles = useMemo(() => {
    return data?.articles.map((article: IArticle) => <Article {...article} key={nanoid()} />)
  }, [data])

  return (
    <Box
      className="flex flex-col items-center"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { tagName } = e.target as HTMLElement
        if (tagName === "INPUT") {
          setState(true)
        }
      }}
    >
      {isLoading && <CircularProgress />}
      {data && !isLoading && (
        <>
          <div className="flex flex-col gap-6">{articles}</div>
          {count > 1 && (
            <Pagination
              count={count}
              className="flex justify-center mt-2"
              onChange={handlePage}
              page={page.current}
              sx={{
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: !isPointer ? "rgba(0, 0, 0, 0.08)" : null,
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  )
}
