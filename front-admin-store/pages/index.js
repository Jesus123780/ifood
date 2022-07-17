import { EmptyLayout } from './_app'
import dynamic from 'next/dynamic'
const HOME = dynamic(
  import('../container/Home'), {
    loading: () => {return (<p>CARGANDO</p>)},
    ssr: false
  }
)
export default function HomeView({ isMobile }) {
  return (<HOME isMobile={isMobile} />)
}


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
HomeView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
