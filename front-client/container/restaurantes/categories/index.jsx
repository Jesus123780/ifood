import React from 'react'
import { CtnBox } from '../styled';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link'
import styled from "styled-components";
import { GET_ALL_CAT_STORE } from '../queries';
import { PColor, SFVColor } from "../../../public/colors";
export const Categories = () => {
  const { data: getCatStore } = useQuery(GET_ALL_CAT_STORE)
  return (
    <Container>
      <List>
        {getCatStore?.getAllCatStore?.map(cat => {
          const nameCat = cat?.cName?.replace(/\s/g, '-')?.toLowerCase();
          return (
            <CtnBox key={cat.catStore}>
              <Link href={`/categories/${nameCat}/${cat.catStore}`}>
                <a>
                  <ItemCategory>
                    <Image
                      objectFit='contain'
                      width={90}
                      height={90}
                      src={'images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                      alt="Picture of the author"
                      blurDataURL="data:..."
                      unoptimized={true}
                      placeholder="blur" // Optional blur-up while loading

                    />
                  </ItemCategory>
                  <h2 className="title-cat">{cat.cName}</h2>
                </a>
              </Link>
            </CtnBox>
          )
        })}
      </List>
      <Link href={'/categorias'}>
        <Anchor>
          Ver todas
        </Anchor>
      </Link>
    </Container>
  )
}

export const Anchor = styled.a`
  color: ${PColor};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const Container = styled.div`
  text-align: end;
`
export const ItemCategory = styled.div`
    width: 100%;
    border: 1px solid ${SFVColor};
    border-radius: 3% ;
    height: 100px;
    align-items: center;
    display: grid;
`
export const List = styled.div`
    width: 100%;
    display: grid;  
    gap: 5px;
    grid-auto-flow: column;
    place-content: space-around;
    overflow: hidden;
    grid-template-columns: 9% repeat(auto-fill, 9%);
    /* margin: 0 30px 30px auto; */
   
    .title-cat {
        margin-top: 10px;
        font-size: 14px;
        font-family: PFont-Light;
        font-weight: 400;
    }
` 