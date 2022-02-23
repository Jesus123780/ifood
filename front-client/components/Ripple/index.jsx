import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BGColor, PColor } from '../../public/colors';

export const RippleButton = props => {
    const { label, onClick, style, family, standard, active, type, widthButton, disabled } = props;
    const button = useRef(null);

    useEffect(() => {
        let mounted = true;
        const b = button.current;
        b.addEventListener('click', e => {
            const rect = button.current.getBoundingClientRect();
            const ripple = document.createElement('div');
            const width = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = `${ width }px`;
            ripple.style.height = `${ width }px`;
            ripple.style.left = `${ e.clientX - rect.left - width / 2 }px`;
            ripple.style.top = `${ e.clientY - rect.top - width / 2 }px`;
            ripple.className = 'ripple';
            button.current.appendChild(ripple);

            setTimeout(() => mounted && button?.current?.removeChild(ripple), 1000);
        });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Button disabled={disabled} widthButton={widthButton} type={type} active={active} standard={standard} family={family} padding={ props.padding } color={ props.color } margin={ props.margin } bgColor={ props.bgColor} ref={button} onClick={onClick} className="ripple-button" style={style}>
            <span id="ripple-button-label">{label}</span>
            {props.children}
        </Button>
    );
};
const Button = styled.button`
 padding: ${ ({ padding })=> padding ? padding: '1em' };
 background-color: ${ ({ bgColor })=> bgColor ? bgColor: 'red' };
 color: ${ ({ color })=> color ? color: BGColor };
 font-family: ${ ({ family })=> family ? family: 'PFont-Light' };
 ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
 ${ ({ standard }) => standard && css`
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    color: #000;
    width: 100%;
    font-size: 11px !important;
    font-family: PFont-Light !important;`
}
 ${ ({ widthButton }) => widthButton && css`
    width: ${ widthButton };`
}
${ props=> props.active && css`
    border-radius: 0;
border-bottom: 3px solid red; ` }

`