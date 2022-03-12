import withSession from 'apollo/session';
import { Stores } from 'container/Stores';
import Head from 'next/head'
export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stores />
    </div>
  )
}


export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req?.session?.get('user')
    if (!user) {
      res.setHeader('location', '/')
      res.statusCode = 302
      res.end()
      return { props: {} }
    }
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/' } }
  
    return {
      props: {}
    }
  }
  )
  