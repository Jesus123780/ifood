import React, { useContext, useEffect, useState } from 'react'
// import { DropdownMenu } from '../dropdown-menu';
import { Container/* , Card  */, Title, Paragraph } from './styled';
// import useFullscreenMode from '../hooks/useFullScreenMode';
// import { InputTags } from '../InputTagsOne';
// import { Rate } from '../Rate';
import { numberFormatM } from '../../utils';
import { DropdownMenu } from '../../components/dropdown-menu';
import { RippleButton } from '../../components/Ripple';

export const Historial = () => {
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
        </Container>
    )
}