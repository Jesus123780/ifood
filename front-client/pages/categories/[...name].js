import Head from 'next/head'
import { CategoryStores } from 'container/categoryStores'
import { cookie, defaultReturnObject } from 'utils'
import { withIronSessionSsr } from 'iron-session/next'
import { useGetCategorieStore } from 'hooks/useGetCategorieStore'

export default function HomeView({ catStoreId }) {
    const [data] = useGetCategorieStore({ catStoreId: catStoreId })
    return (
        <div >
            <Head>
                <title>Delibery {data?.cName || ''} categorías  { data?.csDescription && data?.csDescription} </title>
                <meta name="description" content={data?.csDescription || ''} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CategoryStores
                data={data || []}
            />
        </div>
    )
}


export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res, query: queryRouter }) {
    try {
        const { name } = queryRouter || {}
        if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
        return {
            props: {
                catStoreId: name[1] || '',
            }
        }
    } catch (error) {
        return {}
    }
},
    cookie
)