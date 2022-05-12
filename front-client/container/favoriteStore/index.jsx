import React from 'react'
import { Container, Title } from './styled';
import { useQuery } from '@apollo/client';
import { GET_ALL_FAV_STORE } from 'container/profile/queries';
import { ListRestaurant } from 'container/restaurantes/restaurant';
// catStore

export const FavoriteStore = () => {
    const { data: dataFav } = useQuery(GET_ALL_FAV_STORE)
    return (
        <Container>
           {dataFav?.getFavorite?.length > 0  &&  <Title>Tus restaurantes Favoritos</Title>}
            <ListRestaurant
                like={true}
                data={dataFav?.getFavorite || []}
            />
        </Container>
    )
}