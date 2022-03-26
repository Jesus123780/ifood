import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_ALL_CAT_STORE } from 'container/restaurantes/queries'
import Image from 'next/image';

export const Categories = props => {
    const { data: getCatStore } = useQuery(GET_ALL_CAT_STORE)
    console.log(getCatStore?.getAllCatStore)
    return (
        <ContainerCategory>
            {getCatStore?.getAllCatStore?.map(cat => {
                const nameCat = cat?.cName?.replace(/\s/g, '-')?.toLowerCase();
                return (
                    <div key={cat.catStore}>
                        <Link href={`/categories/${nameCat}/${cat.catStore}`}>
                            <a>
                                <ContentCateItem>
                                    <img
                                        src={cat.cPathImage}
                                    />
                                    {!cat.cPathImage && <Image
                                        objectFit='contain'
                                        width={90}
                                        height={90}
                                        src={'images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                                        alt="Picture of the author"
                                        blurDataURL="data:..."
                                        unoptimized={true}
                                        placeholder="blur"
                                    />}
                                    <h2 className="title-cat">{cat.cName}</h2>
                                </ContentCateItem>
                            </a>
                        </Link>
                    </div>
                )
            })}
        </ContainerCategory>
    )
}

const ContainerCategory = styled.div`
    max-width: 1366px;
    width: 100%;
    margin: auto;
    grid-template-columns: repeat(auto-fill,minmax(275px,1fr));
    grid-gap: 30px;
    display: grid;
    grid-gap: 28px;
    max-width: 1366px;
    margin: 30px auto 20px;
`
const ContentCateItem = styled.div`
    border: 1px solid #cccccc29;
    font-weight: 200;
    border-radius: 4px;
    font-size: 16px;
    padding: 16px;
    font-family: PFont-Regular;
    .title-cat {
        color: #3e3e3e;
        font-weight: 500;
        font-size: 1.5rem;
        margin: 20px 0;
        line-height: 0.875rem;
        font-family: PFont-Light;
        word-break: break-word;
    }
    
`