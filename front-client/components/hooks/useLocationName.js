import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PColor } from '../../assets/colors';

export const LocationName = () => {
    const location = useLocation();
    const name = location?.pathname
    const position = name.indexOf('/')
    return (<Search Text={name.substr(position + 1 || name.length)}/>
    )
}

const Search = ({ children, Text }) => {

    return (
        <ContainerSearch>
            <Link> Buscado por</Link>
            <span style={{ fontFamily: 'PFont-Regular', fontSize: '1.5625rem', color: PColor }}>
                &nbsp;
                {Text}
            </span>
            <div>
                {children}
            </div>
        </ContainerSearch>
    )
}
const ContainerSearch = styled.div`
    text-align: start;
    margin-bottom: 30px;
    width: 90%;
    margin: 40px 40px 10px auto;
    border-bottom: .0625em solid #e6e6e6;
    padding-bottom: 10px;
    @media only screen and (max-width: 960px){
        display: none;
    }
`
const Link = styled.span`
    font-size: 1.5625rem;
    color: black;
    font-family: PFont-Regular;
`