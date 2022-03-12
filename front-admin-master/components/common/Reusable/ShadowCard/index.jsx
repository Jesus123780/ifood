import { TextH2Main } from 'components/common/h2'
import React from 'react'
import { HeadCard, ShadowCardContainer } from './styles'

export const MainCard = ({ children, title, noneShadow, display, width }) => {
    return (
        <div style={{ display: display, width: width }}>
            <TextH2Main text={title} />
            {/* <HeadCard>{title}</HeadCard> */}
            <ShadowCardContainer noneShadow={noneShadow}>
                <div>
                    {children}
                </div>
            </ShadowCardContainer>
        </div>
    )
}