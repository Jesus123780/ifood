import { Home } from '../container/Home'
import { EmptyLayout } from './_app'

export default function HomeView({ isMobile }) {
  return (<Home isMobile={isMobile} />)
}
HomeView.Layout = EmptyLayout


export async function getServerSideProps(context) {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))
  return {
    props: {
      isMobile
    }
  }
}