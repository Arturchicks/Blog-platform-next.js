import { useEffect, useState } from "react"

export const useFetch = <T>(query: string, initialOpt: RequestInit) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errors, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    if (query.length)
      fetch(query, initialOpt)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false)
          setData(data)
        })
        .catch((e) => {
          setIsLoading(false)
          setError(e)
        })
  }, [query, initialOpt])
  return { data, isLoading, errors }
}
