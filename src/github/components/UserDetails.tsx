import { GithubUserType } from "../types/github"
import { UserRepositories } from "./UserRepositories"

type UserDetailsProps = {
  data: GithubUserType,
  onSelect?: (name: string) => void
}
export const UserDetails: React.FC<UserDetailsProps> = ({ data, onSelect = () => void 0 }) => {
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
