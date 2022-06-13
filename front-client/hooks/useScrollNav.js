import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PColor } from '../../public/colors';


/**
 * @param {number} currentPosition Current Scroll position
 * @param {Array} sectionPositionArray Array of positions of all sections
 * @param {number} startIndex Start index of array
 * @param {number} endIndex End index of array
 * @return {number} Current Active index
 */
 const nearestIndex = (
    currentPosition,
    sectionPositionArray,
    startIndex,
    endIndex
) => {
    if (startIndex === endIndex) return startIndex;
    else if (startIndex === endIndex - 1) {
        if (
            Math.abs(
                sectionPositionArray[startIndex].headerRef.current.offsetTop -
          currentPosition
            ) <
      Math.abs(
          sectionPositionArray[endIndex].headerRef.current.offsetTop -
          currentPosition
      )
        )
        {return startIndex;}
        else return endIndex;
    } else {
        const nextNearest = ~~((startIndex + endIndex) / 2);
        const a = Math.abs(
            sectionPositionArray[nextNearest].headerRef.current.offsetTop -
        currentPosition
        );
        const b = Math.abs(
            sectionPositionArray[nextNearest + 1].headerRef.current.offsetTop -
        currentPosition
        );
        if (a < b) {
            return nearestIndex(
                currentPosition,
                sectionPositionArray,
                startIndex,
                nextNearest
            );
        } else {
            return nearestIndex(
                currentPosition,
                sectionPositionArray,
                nextNearest,
                endIndex
            );
        }
    }
};

export default function ScrollNav({ navHeader }) {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            // eslint-disable-next-line
            let index = nearestIndex(
                window.scrollY,
                navHeader,
                0,
                navHeader.length - 1
            );
            setActiveIndex(index);
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Content>
            {navHeader.map((header, index) => (
                <Anchor key={index + header.headerID}
                    style={{ color: activeIndex === index ? 'red' : 'green' }}
                    href={`#${ header.headerID }`}
                >
                    {header.headerTitle}
                </Anchor>
            ))}
        </Content>
    );
}


const Anchor = styled.a`
    font-size: 11px;
    font-weight: 100;
    line-height: 1.29;
    color: ${ PColor };
    display: block;
    padding: 11px 55px;
    font-family: PFont-Light;
    
`
const Content = styled.div`
    padding: 0;
`
ScrollNav.propTypes = {
    navHeader: PropTypes.arrayOf(
        PropTypes.shape({
            headerID: PropTypes.string,
            headerRef: PropTypes.object.isRequired,
            headerTitle: PropTypes.string.isRequired
        })
    ).isRequired
};