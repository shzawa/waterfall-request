import { useCallback } from "react"
import { GithubRepoType, GithubUserType } from "../types/github"
import { Fetch } from "../../common/components/Fetch"
import { UserDetails } from "./UserDetails"

export const GithubUser: React.FC<Pick<GithubUserType, 'login'>> = ({ login }) => {
  const onSelect = useCallback((repoName: GithubRepoType['name']) => {
    console.log(`${repoName} selected`)
  }, [])

  return (
    <Fetch <GithubUserType>
      url={`https://api.github.com/users/${login}`}
      renderSuccess={(props) => (
        <UserDetails {...props} onSelect={onSelect} />
      )}
    />
  )
}

