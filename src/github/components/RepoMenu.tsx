import { useEffect } from "react"
import { useIterator } from "../../common/hooks/useIterator"
import { GithubRepoType, GithubUserType } from "../types/github"
import { RepositoryReadme } from "./RepositoryReadme"


type RepoMenuProps = Pick<GithubUserType, 'login'> & {
  repositories: GithubRepoType[]
  onSelect?: (name: string) => void
}

export const RepoMenu: React.FC<RepoMenuProps> = ({ repositories, login, onSelect = () => void 0 }) => {
  const [{ name }, previous, next] = useIterator(repositories)

  useEffect(() => {
    if (!name) return
    onSelect(name)
  }, [name, onSelect])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button onClick={previous}>&lt;</button>
        <p>{name}</p>
        <button onClick={next}>&gt;</button>
      </div>
      <RepositoryReadme login={login} repo={name} />
    </>
  )
}
