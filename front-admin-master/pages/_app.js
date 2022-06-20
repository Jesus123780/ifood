import PropTypes from "prop-types"
import { ApolloProvider } from '@apollo/client'
import { Layout as MainLayout } from 'components/layout'
import Context from 'context/Context'
import { GlobalStyle } from 'public/styles/GlobalStyle'
import { useApollo } from '../apollo/apolloClient'
import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const Layout = Component.Layout ? Component.Layout : MainLayout

  return (
    <Context>
      <ApolloProvider client={apolloClient}>
      <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Context>
  )
}


export default MyApp
export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired
}

