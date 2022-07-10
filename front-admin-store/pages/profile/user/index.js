
import { UserProfile } from 'container/profile/user'
import getAuth from 'pages/api/auth/getAuth'

export default function UserProfileView() {
  return (
    <UserProfile />)
}

// export async function getServerSideProps({ req, res }) {
//   const session = await getAuth(req, res)
//   return { props: {} }
// }