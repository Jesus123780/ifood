
import { UserProfile } from 'container/profile/user'

export default function UserProfileView() {
  return (
    <UserProfile />)
}

// export async function getServerSideProps({ req, res }) {
//   const session = await getAuth(req, res)
//   return { props: {} }
// }