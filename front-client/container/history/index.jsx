import React, { useContext, useEffect, useState } from 'react'
// import { DropdownMenu } from '../dropdown-menu';
import { Container/* , Card  */, Title, Paragraph } from './styled';
// import useFullscreenMode from '../hooks/useFullScreenMode';
// import { InputTags } from '../InputTagsOne';
// import { Rate } from '../Rate';
import { numberFormat, numberFormatM } from '../../utils';
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
    console.log(positionMenu)
    // const [elementRef, FullscreenIcon] = useFullscreenMode();
    const [rating, setRating] = useState(0);
    
    return (
        <Container>
            <DropdownMenu show={visibleMenu} position={positionMenu} onClickOutside={() => setVisibleMenu(false)} options={[
                { optionName: 'Trasladar' },
                { optionName: 'cortar' },
            ]} /> 
            <RippleButton onClick={(e) => handleMenu(e)}>
                onClick</RippleButton>
            <Container>
                <Title>Historial </Title>
                <Paragraph>Historial</Paragraph>
            </Container>
            <Table
                titles={[
                    { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
                    { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
                    { name: 'Date', justify: 'flex-center', width: '1fr' },
                    { name: 'Canal', justify: 'flex-center', width: '1fr' },
                    { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
                    { name: 'Costo total', justify: 'flex-center', width: '1fr' },
                    { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
                    { name: 'Cupon', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={dataFav}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                    <Item>
                        <span> Restaurante</span>
                    </Item>
                    <Item>
                        <span># {x.pCodeRef}</span>
                    </Item>
                    <Item>
                        <span> {moment(x.pDatCre).format('DD/MM/YYYY')} - {moment(x.pDatCre).format('h:mma')} </span>
                    </Item>
                    <Item>
                        <span> DELIVERY-APP </span>
                    </Item>
                    <Item>
                        <span> {x.payMethodPState ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
                    </Item>
                    <Item>
                        <span> $ {numberFormat(x.totalProductsPrice)} </span>
                    </Item>
                    <Item>
                        {/* <CircleStatus onClick={() => handleOpenModal(x)} pulse={x.pSState !== 5} status={x.pSState}>
                            <Tooltip>{x.pSState === 1 ? 'Aceptado' : x.pSState === 2 ? 'Pedido en proceso' : x.pSState === 3 ? 'listo para entrega' : x.pSState === 4 ? 'Pedido pagado (Concluido)' : 'Rechazado'}</Tooltip>
                        </CircleStatus> */}
                    </Item>
                    <Item>
                        <span> {i + 1}</span>
                    </Item>
                    <Item>
                        <Button onClick={() => handleOpenModal(x)}>
                            Ver detalles
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