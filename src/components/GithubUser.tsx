import { useCallback } from "react"
import { GithubRepoType, GithubUserType } from "../types/github"
import { Fetch } from "./Fetch"
import { UserRepositories } from "./UserRepositories"

export const GithubUser: React.FC<Pick<GithubUserType, 'login'>> = ({ login }) => {
  const onSelect = useCallback((repoName: GithubRepoType['name']) => {
    console.log(`${repoName} selected`)
  }, [])

  return (
    <Fetch <GithubUserType>
      url={`https://api.github.com/users/${login}`}
      renderSuccess={(props) => UserDetails({...props, onSelect})}
    />
  )
}

type UserDetailsProps = {
  data: GithubUserType,
  onSelect?: (name: string) => void
}
const UserDetails: React.FC<UserDetailsProps> = ({ data, onSelect = () => void 0 }) => {
  return (
    <div className="githubUser">
      <img
        src={data.avatar_url}
        alt={data.login}
        style={{ width: 200 }}
      />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepositories
        login={data.login}
        onSelect={onSelect}
      />
    </div>
  )
}
