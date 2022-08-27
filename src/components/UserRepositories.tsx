import { GithubRepoType, GithubUserType } from "../types/github"
import { Fetch } from "./Fetch"
import { RepoMenu } from "./RepoMenu"

type UserRepositoriesProps = Pick<GithubUserType, 'login'> & {
  onSelect?: (name: string) => void
}

export const UserRepositories: React.FC<UserRepositoriesProps> = ({ login, onSelect = () => void 0 }) => {
  return (
    <Fetch <GithubRepoType[]>
      url={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <>
          <p>{data.length} public repos.</p>
          <RepoMenu
            repositories={data}
            login={login}
            onSelect={onSelect} />
        </>
      )}
    />
  )
}


