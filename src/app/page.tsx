"use client"
import Article from "@/components/modules/article/article"
import { ArticleType } from "@/components/modules/article/types"
import { store } from "@/store/store"
import { QueryArticles } from "@/store/types"
import { BASE_URL } from "@/utils/base_url"
import { useFetch } from "@/utils/hooks/useFetch/useFetch"
import { Box, List, Pagination } from "@mui/material"
import { nanoid } from "nanoid"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"

const Articles: React.FC<{
  query: string
  value: unknown
}> = ({ query, value }) => {
  const [count, setCount] = useState<number>(0)
  const [offset, setOffSet] = useState<number>(0)
  const [showPagination, setShowPagination] = useState(false)
  const ref = useRef(null)
  const token = localStorage.getItem("token")
  const { isLoggedIn } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.local
  )
  const options = useMemo(() => {
    return !token
      ? { method: "GET" }
      : {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
  }, [isLoggedIn])
  const { data, isLoading } = useFetch<QueryArticles>(
    `${BASE_URL}/articles?offset=${offset}&${query}=${value}`,
    options
  )
  const page = useRef<number>(1)
  const handlePage = useCallback(
    (e: React.ChangeEvent<unknown>, value: number) => {
      setOffSet((value - 1) * 20)
      page.current = value
    },
    []
  )
  const handleCount = useCallback(() => {
    if (data) setCount(Math.floor(data?.articlesCount / 20))
    window.scrollTo(0, 0)
    setShowPagination(true)
  }, [data])
  const articles = useMemo(() => {
    return data?.articles?.map((article: ArticleType) => (
      <Article {...article} key={nanoid()} />
    ))
  }, [isLoading, query, value])

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <CSSTransition
        nodeRef={ref}
        in={!isLoading}
        onEnter={handleCount}
        classNames="display"
        timeout={400}
      >
        <Box
          ref={ref}
          sx={{
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          <List className="flex flex-col gap-6">{articles}</List>
          {showPagination && count > 1 && (
            <Pagination
              count={count}
              className="flex justify-center mt-2"
              sx={{ "& .MuiPaginationItem-root": { color: "text.secondary" } }}
              onChange={handlePage}
              page={page.current}
            />
          )}
        </Box>
      </CSSTransition>
    </Box>
  )
}
export default Articles
