import { TextH2Main } from 'components/common/h2'
import React from 'react'
import { HeadCard, ShadowCardContainer } from './styles'

export const MainCard = ({ children, title, noneShadow, display, width, weight, size }) => {
    return (
        <div style={{ display: display, width: width }}>
            <TextH2Main text={title} weight={weight} size={size} />
            {/* <HeadCard>{title}</HeadCard> */}
            <ShadowCardContainer noneShadow={noneShadow}>
                <div>
                    {children}
                </div>
            </ShadowCardContainer>
        </div>
    )
}