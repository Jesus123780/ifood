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

export const Historial = ({ dataFav }) => {
    const [visibleMenu, setVisibleMenu] = useState(false) // Visibilidad del menú
    const [positionMenu, setPositionMenu] = useState({})
    const handleMenu = (e, param) => {
        console.log(param)
        setPositionMenu({ x: e.pageX - (param || 0), y: e.pageY })
        setVisibleMenu(true)
    }
    const { getOneStore } = dataFav
    console.log(dataFav)
    return (
        <Container>
            <Container>
                <Title>Restaurante favoritos </Title>
            </Container>
            <Table
                titles={[
                    { name: 'Restaurante', key: '', justify: 'flex-center', width: '1fr' },
                    { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
                    { name: 'Canal', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={dataFav}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                    <Item>
                        <span> {x.getOneStore?.storeName}</span>
                    </Item>
                    <Item>
                        <span> {moment(x.createAt).format('DD/MM/YYYY')} - {moment(x.createAt).format('h:mma')} </span>
                    </Item>
                    <Item>
                        <span> DELIVERY-APP </span>
                    </Item>
                    <Item>
                        <Button>
                            <Link passHref shallow
                                href={`delivery/${encodeURIComponent(x?.getOneStore.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(x?.getOneStore?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(x?.getOneStore?.storeName?.replace(/\s/g, '-')?.toLocaleLowerCase())}/${x?.idStore}`}>
                                <a>
                                    Ver detalles
                                </a>
                            </Link>
                        </Button>
                    </Item>
                </Section>)}
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