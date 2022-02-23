import React from 'react'
import { ListRestaurant } from '../restaurantes/restaurant'
import { Container, Text } from './styled'

export const CategoryStores = ({ data }) => {
    return (
        <Container>
            <Text margin='30px 0'>{data?.cName}</Text>
            <ListRestaurant
                data={data?.getAllStore}
            />
        </Container>
    )
}
