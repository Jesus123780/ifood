import { useLazyQuery } from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CategoryStores } from '../../../container/categoryStores'
import { GET_ONE_STORE_IN_CATEGORY } from '../../../container/categoryStores/queries'

export default function HomeView() {
    // STATES
    const location = useRouter()
    const name = location.query.name
    const id = location.query.id
    const [dataCatStores, setDataCatStore] = useState([])
    const [getOneCatStore, { data: dataCatSto }] = useLazyQuery(GET_ONE_STORE_IN_CATEGORY)

    useEffect(() => {
        getOneCatStore({
            variables: {
                catStore: id
            }
        })
        setDataCatStore([dataCatSto?.getOneCatStore])
    }, [id, name])

    return (
        <div >
            <Head>
                <title>Delibery categorias </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CategoryStores
                data={dataCatSto?.getOneCatStore || {}}
            />
        </div>
    )
}