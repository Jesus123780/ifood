import { useEffect } from 'react'
import Image from 'next/image'
import { getSession, signOut, signIn, getProviders } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'


export default function Home({ session }) {
  const { user } = session || {}
  const { name, image } = user || {}
   useEffect(() => {
    (async () => {
      const providers = await getProviders();
      console.log(providers);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => signOut()}>Close</button>
      <button onClick={() => signIn('github')}>github</button>
      <main className={styles.main}>
        Hola {name}
        <img src={`${image}`} style={{ height: '100px', width: '100px' }} />
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  }

  return {
    props: {
      session: session
    }
  }
}
