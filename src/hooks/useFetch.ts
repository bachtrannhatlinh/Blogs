// / eslint-disable @typescript-eslint/no-explicit-any 
import { paths } from '../apps'
import { ApiResponse } from '../models'
import { useEffect, useState } from 'react'

type Fetcher<T, P> = ((params?: P) => Promise<ApiResponse<T>>) | ((params: P) => Promise<ApiResponse<T>>)

interface UseFetchParams<T, P> {
  fetcher: Fetcher<T, P>
  params?: P
}

export default function useFetch<T, P>({ fetcher, params }: UseFetchParams<T, P>, deps: any[] = []) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()
  const [data, setData] = useState<T>()

  useEffect(() => {
    setLoading(true)
    setError(undefined)
    // setData(undefined)

    const newParams = params ?? ({} as P)

    fetcher(newParams)
      .then(value => setData(value.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [...deps])

  if (error?.code === 404) {
    window.location.href = paths.notFound.feature()
  }
  return { loading, error, data }
}
