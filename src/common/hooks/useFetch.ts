import axios from "axios"
import { useEffect, useState } from "react"

export const useFetch = <T>(url: string) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    if (!url) return
    (async() => {
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e)
          console.log(e)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return [data, error, isLoading] as const
}
