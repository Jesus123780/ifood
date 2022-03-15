import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { GET_TYPE_PQR } from '../queries'
import { Container } from './styled'
import { IconArrowRight } from '../../../../assets/icons/icons'
import { SFColor, SFVColor } from '../../../../assets/colors'
import { icons } from './codeIcon'
export const StorePqr = () => {
    const { data, loading, error: errorC } = useQuery(GET_TYPE_PQR)

    if (errorC) return <>Ocurrió un error interno</>
    return (<>
        {loading && <i>Cargando datos</i>}
        <Container>
            <Content>
                {!loading &&
                    <CardWrapper>
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column ', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 12%)' }}>
                            {/* eslint-disable-next-line */}
                            {!!data?.typopqr && data.typopqr.map(x => <QuestionsList title={x.thpName} icon={icons.find(j => j.index == x.thpIcon)?.icon} iconArrow={ <IconArrowRight color='red' size='10px' />}/>)}
                        </div>
                    </CardWrapper>
                }

            </Content>
        </Container>
    </>
    )
}
const QuestionsList = ({ icon, title, iconArrow }) => {
    return (
        <ContainerQuestion>
            <AndesListItem>
                <ItemFirstColumn>
                    <>{icon}</>
                    <ItemPrimary>{title}</ItemPrimary>
                </ItemFirstColumn>
                <span>{iconArrow}</span>
            </AndesListItem>
        </ContainerQuestion>
    )
}
// Questions List
const ContainerQuestion = styled.div`
    min-height: 56px;
    border-bottom: .0625em solid #e6e6e6;
    outline: none;
    border-left: solid transparent;
    &:hover{
        background-color: #fff;
        border-left: solid;
        color: #3483fa;
    }
    `
const AndesListItem = styled.div`
    display: flex;
    outline: none;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 1.1428571429em;
    height: 100%;
    align-items: center;
`
const ItemPrimary = styled.span`
    font-size: 16px;
    color: rgba(0,0,0,.8);
    font-family: PFont-Regular;
    margin-left: 20px;
`
const ItemFirstColumn = styled.div`

`

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: row;
    height: 100%;

`
const CardWrapper = styled.div`
    width: 40%;
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 0 10px;

`
export const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value }) => value ? '11px' : '13px' };
    top: ${ ({ value }) => value ? '-17px' : '10px' };
    left: ${ ({ left }) => left ? left : '10px' };
    color: ${ ({ value }) => value ? SFColor : SFVColor };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`

export const TextArea = styled.textarea`
    width: 100%;
    height: ${ ({ height }) => height ? height : '0' };
    font-size: 15px;
    padding: 15px;
    outline: none;
    max-width: 98.5%;
    min-width: 99%;
    min-height: 200px;
    border: 1px solid #cccccc42;
    &:focus ~ ${ LabelInput } {
        top: -17px;
        font-size: 15px;
    }
    & ~ ${ LabelInput } {
        top: ${ ({ value }) => value ? '-17px' : '10px' };
        font-size: 13px;
    }
`