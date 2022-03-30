import { GET_ALL_EMPLOYEE_STORE } from 'container/dashboard/queriesStore'
import React from 'react'
import styled, { css } from 'styled-components'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { RippleButton } from 'components/Ripple'

export const TeamStore = () => {
    const { data: dataEmployees, error: errEmployees } = useQuery(GET_ALL_EMPLOYEE_STORE)
    return (
        <div>
            {dataEmployees?.employees?.map(x => (
                <ItemTeam key={x.eId}>
                    <ItemInf>
                        {x.uEmail}
                    </ItemInf>
                    <Link activeClassName="active" href={`/team/${x.idEmployee}`}>
                        <a>
                            <ItemInf end>
                                <RippleButton margin='0' widthButton='70px' size='10px' padding='5px'>{x.uEmail.slice(0, 2).toUpperCase()}</RippleButton>
                            </ItemInf>
                        </a>
                    </Link>
                </ItemTeam>
            ))}
        </div>
    )
}

export const ItemTeam = styled.div`
    tab-size: 4;
    display: flex;
    justify-content: space-between; 
    border-bottom: 1px solid #ccc;
    border-collapse: collapse;
    font-size: .875rem;
    line-height: 1.5715;
    box-sizing: border-box;
`
export const ItemInf = styled.div`
  padding: .75rem;
  ${props => props.end && css`
  justify-content: flex-end;
    display: flex;

  `}
`