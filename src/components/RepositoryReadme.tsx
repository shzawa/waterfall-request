import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { GithubUserType } from "../types/github"

type RepositoryReadmeProps = Pick<GithubUserType, 'login'> & {
  repo: string
}
export const RepositoryReadme: React.FC<RepositoryReadmeProps> = ({ login, repo }) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()
  const [markdown, setMarkdown] = useState('')

  const loadReadme = useCallback(async (login: string, repo: string) => {
    setLoading(true)
    const url = `https://api.github.com/repos/${login}/${repo}/readme`
    const { download_url } = await axios.get<{ download_url: string }>(url).then(res => res.data)
    const markdown = await axios.get<string>(download_url).then(res => res.data)
    setMarkdown(markdown)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!repo || !login) return
    loadReadme(login, repo).catch(setError)
  }, [loadReadme, login, repo])

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (isLoading) return <p>Loading...</p>

  return <ReactMarkdown>
    {markdown}
  </ReactMarkdown>
}
