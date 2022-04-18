import { useStore } from 'components/hooks/useStore'
import React, { useEffect, useState } from 'react'
import { Content, Item, Text, Ticket } from './styled'

export const Prints = ({ data, total, code, change }) => {
    const [dataStore] = useStore()
    const [time, changeTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
      setInterval(() => {
        changeTime(new Date().toLocaleTimeString());
      }, 1000);
    }, []);
    const { Image } = dataStore || {}
    return (
        <Ticket>
            <div id="ticket" className="ticket">
                <img
                    src={Image}
                    alt="Logotipo" />
                <Text fontWeight='800' className="centrado">TICKET DE VENTA</Text>
                <Item>
                    <span>PRODUCTO</span>
                    <span>$ PRECIO</span>
                </Item>
                <Content>
                    {data.map((item, i) => (
                        <Item key={i + 1}>
                            <span>{item.pName}</span>
                            <span>${item.ProPrice}</span>
                        </Item>
                    ))}
                </Content>
                <Item>
                    <span>Pedido</span>
                    <span>{code}</span>
                </Item>
                <Item>
                    <Text>FECHA</Text>
                    <Text>{time}</Text>
                </Item>
                <Item>
                    <Text fontWeight='bold'>SUB TOTAL</Text>
                    <Text fontWeight='bold'>{(total)}</Text>
                </Item>
                <Item>
                    <Text fontWeight='bold'>CAMBIO</Text>
                    <Text fontWeight='bold'>{change}</Text>
                </Item>
                <Item>
                    <Text fontWeight='bold'>TOTAL</Text>
                    <Text fontWeight='bold'>{total}</Text>
                </Item>
            </div>
        </Ticket>
    )
}