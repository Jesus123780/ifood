import React, { useContext, useEffect, useState } from 'react'
// import { DropdownMenu } from '../dropdown-menu';
import { Container/* , Card  */, Title, Paragraph } from './styled';
// import useFullscreenMode from '../hooks/useFullScreenMode';
// import { InputTags } from '../InputTagsOne';
// import { Rate } from '../Rate';
import { numberFormat, numberFormatM } from '../../utils';
import Link from 'next/link'
import { DropdownMenu } from '../../components/dropdown-menu';
import { RippleButton } from '../../components/Ripple';
import { Table } from '../../components/Table';
import moment from 'moment';
import styled from 'styled-components';
import { PColor, PLColor } from '../../public/colors';
import { Section } from '../../components/Table/styled';
import { useQuery } from '@apollo/client';
import { GET_ALL_FAV_STORE } from 'container/profile/queries';
import { ListRestaurant } from 'container/restaurantes/restaurant';
// catStore

export const FavoriteStore = () => {
    const { data: dataFav } = useQuery(GET_ALL_FAV_STORE)
    return (
        <Container>
            <ListRestaurant
                like={true}
                data={dataFav?.getFavorite || []}
            />
        </Container>
    )
}
const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`