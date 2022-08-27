import { useFetch } from "../hooks/useFetch"

type FetchProps<T> = {
  url: string
  renderSuccess: React.FC<{ data: T }>
  loadingFallback?: JSX.Element
  renderError?: (error: Error) => JSX.Element
}

export const Fetch = <T, >({
  url,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = error => <pre>{JSON.stringify(error, null , 2)}</pre>
}: FetchProps<T>) => {
  const [data, error, isLoading] = useFetch<T>(url)

  if (error) return renderError(error)
  if (isLoading) return loadingFallback
  if (!data) return <p>No hits.</p>

  return renderSuccess({ data })
}
