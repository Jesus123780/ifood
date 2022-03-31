import styled, { css, keyframes } from 'styled-components'
import { StyleSheet } from '@react-pdf/renderer'
import { BColor, BGColor, EColor, ESFColor, PColor, SECColor, PVColor, TBGSColor, BGVColor, SFVColor, PLVColor } from '../../public/colors'
import { fadeIn, fadeOut } from '../../components/AlertBox/styled'
import { BG_ANIMATION_, SideIn, SlideInLeft } from '../../components/animations'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 #12d4aaef;
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const WrapperButtonAction = styled.div`
`
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
export const Toolbar = styled.div`
    position: relative;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background-color: #0069ff;
`
export const Options = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: ${({ direction }) => direction || 'column'}; */
  justify-content: space-between;
  ${props => props.justify && css`
      width: 50%;
      align-items: flex-end;
  `}
`
export  const MerchantListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
    gap: 10px;
    @media only screen and (min-width: 560px) {
      grid-template-columns: repeat(2,minmax(320px,1fr));
      grid-gap: 30px;
      padding: 0 20px;
    }
`
export const CardProductsContent = styled.div`
   grid-template-columns: 1fr 146px;
    grid-gap: 15px;
    padding: 15px;
    min-width: 320px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
    border-radius: 4px;
    position: relative;
    display: grid;
    min-height: 190px;
    width: 100%;
    height: 147px;
    background: #fff;
    padding: 20px;
    text-decoration: none;
    transition: .2s;
    overflow: hidden;
    height: 100%;
    .footer  {
      position: absolute;
      bottom: 15px;
    }
    .card__price, .card__des  {
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: #3e3e3e;
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
    .card__des {
      text-decoration: line-through;
    }
    .card__description {
      font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    margin-bottom: 10px;
    font-size: .875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
    img {
      object-fit: fill;
      width: 100%;
      height: 100%;
    }
    `
export const CardProductsModal = styled(CardProductsContent)`
  border: none;
  padding: 0px;
  height: min-content;
  grid-template-columns: 1fr 50%;
    align-items: center;
    place-content: center;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`
export const ContentImage = styled.div`
    width: 100%;
    justify-content: flex-start;
    align-content: flex-start;
    height: 500px;
    width: 500px;
    img {
      object-fit:contain;
      width: 100%;
      height: 100%;
    }
    `
export const Flex = styled.div`
  display: flex;
  width: 100%;
  
  `
export const DisRestaurant = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(63,62,62,.1);
    border-radius: 4px;
    width: 90%;
    margin: auto;
    padding: 10px;
    height: auto;
    padding: 11px 20px;
    .dish-observation-form__label {
      line-height: 1.15;
      font-weight: 500;
      font-size: 1rem;
      color: #717171;
    }
    .dish-restaurant__header {
      line-height: 1.15;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dish-restaurant__divisor {
      line-height: 1.15;
      font-size: 16px;
      cursor: pointer;
      box-sizing: border-box;
      border-top: 2px dashed #f2f2f2;
      margin: 8px 0;
    }
`
export const Wrapper = styled.div`
    padding: 30px;
    width: 100%;
    max-width: 1366px;
    /* animation: 2s linear 0s infinite normal none ${BG_ANIMATION_}; */
    /* background: linear-gradient(90deg, rgb(255, 254, 254) 0%, rgb(194, 190, 190) 20%, rgba(255, 255, 255, 0.904) 50%, rgba(255, 255, 255, 0.219) 80%, rgba(250, 250, 250, 0.911) 100%) 0% 0% / 200% 200%; */
    margin: auto;
    position: relative;
    ${props => props.center && css`
    display: grid;
    `}
    margin: auto;
    justify-content: center;
    margin: auto;
    height: 100%;
    display: grid;
    justify-content: ${({ justifyContent }) => justifyContent || 'normal'};
    &:last-child {
        border-right: none;
    }
`

export const ButtonStore = styled.button`
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin: 30px auto;
  margin-bottom: 58px;
  cursor: pointer;
  display: flex;
  border: 1px solid ${PLVColor};
`
export const OlList = styled.ol`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    word-wrap: break-word;
    box-sizing: border-box;
    outline: none !important;
    margin-top: 0;
    margin-bottom: 0!important;
    padding: 15px 15px 0 15px;
    list-style: none;
`
export const FeedItem = styled.li`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    font-family: "Source Sans Pro", sans-serif;
    word-wrap: break-word;
    list-style: none;
    box-sizing: border-box;
    outline: none !important;
    position: relative;
    padding-bottom: 20px;
    padding-left: 30px;
    border-left: 2px solid #e4e8eb;
    .date {
      display: block;
      position: relative;
      top: -5px;
      color: #8c96a3;
      text-transform: uppercase;
      font-size: 13px;
    }
    .activity-text{
      position: relative;
      top: -3px;
    }
    &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -6px;
    width: 10px;
    height: 10px;
    border-radius: 6px;
    background: #ffffff;
    border: 1px solid #67a8e4;
}
`
export const AnchorLink = styled.a`
    font-family: PFont-Light;
    border-bottom: 1px solid #ccc;  
    width: 100%;
`
export const Button = styled.button`
  background-color: transparent;
  padding: ${({ padding }) => padding || '7px'};
  height: ${({ height }) => height || '50px'};
  font-family: PFont-Light;
  transition: 100ms;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: ${BColor};
  font-size: ${({ size }) => size || '1.1em'};
  ${props => props.active && css`
    border-bottom: 3px solid ${PColor};
    font-weight: 400;
    border: 1px solid #ccc;
  ` }
  ${props => props.border && css`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
  `}
  ${props => props.shadow && css`
  box-shadow: 0 2px 16px 0 rgb(0 0 0 / 10%);
  margin-right: 24px;
  transition: color .16s ease-in-out,
  background-color .16s ease-in-out,
  border-color .16s ease-in-out;
  ` }
`

export const WrapperFilter = styled.div`  
    margin-bottom: 30px;
    display: flex;
    width: 100%;
    height: min-content;
    border-bottom: 3px solid #f5f0eb;
`
export const Circle = styled.div` 
  border: 2px solid #12d4aaef;
  border-radius: 50%;
  height: 50px;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${props => props.pulse
    ? css`
    animation: ${pulse} 2s infinite;
  `
    : css`
  ` }
  ${props => props.active
    ? css`
    box-shadow: 0 0 0 10px #12d4aaef, 0 0 0 22px #12d4aa9e;
    `
    : css`
    box-shadow: 0 0 0 5px #ebeef3, 0 0 0 10px #f3f4f6;
  ` }
`
export const CheckAnimation = styled.div`
 .success-checkmark {
    width: 50px;
    height: 40px;
    
    .check-icon {
        width: 40px;
        height: 40px;
        position: relative;
        border-radius: 50%;
        box-sizing: content-box;
        border: 4px solid #4CAF50;
        
        &::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
        }
        
        &::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
        }
        
        &::before, &::after {
            content: '';
            height: 100px;
            position: absolute;
            transform: rotate(-45deg);
        }
        
        .icon-line {
            height: 5px;
            background-color: #4CAF50;
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
            
            &.line-tip {
                top: 46px;
                left: 14px;
                width: 25px;
                transform: rotate(45deg);
                animation: icon-line-tip 0.75s;
            }
            
            &.line-long {
                top: 38px;
                right: 8px;
                width: 47px;
                transform: rotate(-45deg);
                animation: icon-line-long 0.75s;
            }
        }
        
        .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid rgba(76, 175, 80, .5);
        }
        
        .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
        }
    }
}

@keyframes rotate-circle {
    0% {
        transform: rotate(-45deg);
    }
    5% {
        transform: rotate(-45deg);
    }
    12% {
        transform: rotate(-405deg);
    }
    100% {
        transform: rotate(-405deg);
    }
}

@keyframes icon-line-tip {
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }
    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }
    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
}

@keyframes icon-line-long {
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }
    100% {
        width: 47px;
        right: 8px;
        top: 38px;
    }
}
`
export const Clip = styled.div`
  .chip{
    display: inline-flex;
    flex-direction: row;
    border: none;
    cursor: pointer;
    height: 30px;
    align-items: center;
    border-radius: 16px;
    /* ${props => props.activebg ? css`
      background-color: rgba(15, 183, 107,0.12) !important;
      ` : css`
      background-color: rgba(242, 17, 54,0.12) !important;
    
    `} */
    vertical-align: middle;
    text-decoration: none;
    justify-content: center;
}
`

export const ChipHead = styled.div`
  transition: 1s ease;
`
export const PaymentStatus = styled.div` 
  height: 15px;
  text-align: center;
  display: flex;
  place-content: center;
  ${props => props.active
    ? css`
        color #12d4aa7d;
        `
    : css`
    color ${BColor};
  ` }
`
export const CircleCompany = styled.div` 
  border: 2px solid #12d4aaef;
  border-radius: 50%;
  height: 50px;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  margin-left: calc(10% - 45px);
  place-content: center;
  min-width: 50px;
  ${props => props.pulse
    ? css`
    animation: ${pulse} 2s infinite;
  `
    : css`
  ` }
  margin-left: calc(10% - 30px);
  &:first-child {
    margin-left: -5px;
  }
`

export const BlueButton = styled.button`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: 'WorkSans-Bold','Helvetica','san-serif';
    font-size: 1em;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    background-color: #0069ff;
    border: 1px solid #0069ff;
    color: #fff;
    transition: all 0.2s ease;
    align-self: flex-start;
    margin-right: 24px;
    width: auto;
    display: flex;
    justify-content: center;
`
export const OptionsFunction = styled.div`
    display: flex;
    position: absolute;
    background: ${BGColor};
    height: 200px;
    z-index: 999;
    width: 200px;
    right: 130px;
    grid-template-columns: auto;
    padding: 10px 0;
    top: 60px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ${({ show }) => show
    ? css`
                 display: grid;
                 `
    : css`
        display: none;
              ` }
    @media only screen and (min-width: 960px){
    }
    border-radius: 10px;
    box-shadow: 0 10px 30px rgb(65 72 86 / 5%);
`
export const Current = styled.div`
  cursor: pointer;
 ${props => props.current && css`
      border-bottom: 3px solid ${PColor};
      font-weight: 400;
      background-color: ${BColor};
  ` }
`
export const ContainerInfo = styled.div`

  border-top: 5px solid ${PVColor};
  padding: 40px;
`
export const ContentModal = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    grid-template-columns: repeat(auto-fill,minmax(20%, 1fr));
    position: relative;
    ${({ overflow }) => overflow && css`overflow: ${overflow};`}
    height: ${({ height }) => height || '50vh'};
    min-height: ${({ height }) => height || '50vh'};
    max-height: ${({ height }) => height || '50vh'};
    @media only screen and (max-width: 960px){
      grid-template-columns: repeat(auto-fill,minmax(25%, 1fr));
    }
    @media only screen and (max-width: 768px){
      grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
    }
    ${props => props.showInvoice && css`
        grid-template-columns: repeat(auto-fill,minmax(25%, 1fr));
    `}
`
export const ButtonAdd = styled.button`
    position: absolute;
    right: 0;
    top: 0px;
    border-radius: 10px 10px 10px 200px;
    width: 60px;
    height: 45px;
    margin: 0;
    overflow: hidden;
    border: none;
    line-height: 1.75;
    text-transform: uppercase;
    transition: background-color 0.3s;
    cursor: pointer;
    padding: .5em;
    font-size: 12px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    font-family: PFont-Light;
    position: absolute;
    right: 0;
    top: 0px;
    border-radius: 10px 10px 10px 200px;
    width: 60px;
    height: 45px;
`
export const HeaderModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
    & > #line {
    line-height: 1.5;
    font-family: "Inter", sans-serif;
    font-weight: inherit;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: .1em;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #d2d6dc;
    background-color: rgba(63,131,248);
    display: block;
    margin-top: 1rem;
    width: 4rem;
    height: 1.5px;
    position: absolute;
    margin-top: 30px;
    }
`
export const Tooltip = styled.div`
    cursor: pointer;
    height: auto;
    width: 100px;
    background-color: ${BGColor};
    transition: all 200ms ease-in-out;
    padding: 5px;
    box-shadow: rgba(10, 10, 10, 0.445) 0px 4px 12px;
    position: absolute;
    margin: 0;
    right: 135px;
    visibility: hidden;
    z-index: 999; 
    opacity: 0;
    &:hover {
          background-color: rgb(44, 160, 28);
          color: ${BGColor};
    }
`
export const ButtonContentT = styled.div`
  position: relative;
  &:hover > ${Tooltip} {
      visibility: visible;
      opacity: 1;
      transform: translateY(-35px);
  }
`

export const CtnInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  ${props => props.border && css`
  border-top: 1px solid #33282830;
  `}
`
export const WrapperInnerInvoiceTo = styled.div`
  /* border: 1px solid rgb(206, 206, 206); */
`
export const CardInvoice = styled.div`
    padding: 15px;
    color: gray;
    position: relative;
    margin: 5px;
    font-size: 12px;
    font-weight: 400;
    ${props => !props.showInvoice && css`
         border: 1px solid rgb(206, 206, 206);
         box-shadow: 0 4px 0 rgb(91 105 135 / 20%);
        &:hover {
          border: 1px solid #c0c2d3;
          box-shadow: 0 2px 0 rgb(91 105 135 / 20%);
        }
    `}
    border-radius: .5rem;
    height: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: all 0.2s ease;
    ${({ height }) => height && css`height: ${height};`}
    `

export const ButtonPagination = styled.button`
    border-radius: 0.2rem;
    color: ${BGColor};
    text-decoration: none;
    width: 80px;
    display: inline-block;
    text-align: center;
    background-color: ${BColor};
    padding: 0.5rem 0.9rem;
`
export const ContentHead = styled.div`
  display: flex;
  flex-direction: row;
`
export const InputFilterNumber = styled.input`
  border: 1px solid #ccc;
  width: 50px;
  height: 40px;
  outline: none;
  `
const LinkPdf = styled.a`
  background-color: transparent;
`
export const LineItems = styled.div`
    background-color: ${BGColor};
    width: 100%;
    display: grid;    
    grid-template-columns: repeat(minmax(100px, 1fr));
    transition: .5s ease;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: -134px;
    background-color: red;
    height: ${({ height }) => height || 'auto'}px;
    margin: ${({ margin }) => margin || ' .5% auto'};
    box-shadow: 0px 0px 14px #00000017;
    `
export const Section = styled.div`
     display: grid;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x?.width} `) : '1fr'}; 
    height: auto;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    background-color: ${({ bgRow }) => bgRow === 1 ? `${TBGAColor}` : bgRow === 2 ? `${TBGVColor}` : bgRow === 3 ? `${TBGBColor}` : bgRow === 4 ? `${TBGSColor}` : bgRow === 5 ? TBGAColor : bgRow === 6 ? TBGEColor : bgRow === 7 ? TBGRColor : bgRow === 8 && TBGDColor};
    :hover {
        background-color: rgba(0,0,0,.075);
        :first-child {
            background-color: #ccc;
        }
    }
`
export const PageA4Format = styled.div`
  width: 20cm;
  height: 29.7cm;
  padding: 2cm;
  margin: 1cm auto;
  border: 1px #D3D3D3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
export const BoxArrow = styled.div`
  display: flex;
  /* flex-direction: ${({ direction }) => direction || 'column'}; */
`
export const InputHide = styled.input`
  display: block;
  opacity: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  zoom: 5;
  width: 100%;
  margin: auto;
`
export const ArrowsLabel = styled.label`
  position: relative;
  display: flex;
  /* flex-direction: ${({ direction }) => direction || 'column'}; */
  user-select: none;
`
export const List = styled.div`
    transition: all 200ms ease-in-out;
    display: flex;
    margin-left: 0px;
    justify-content: center;
    width: min-content;
    align-items: center;
    font-size: 16px !important;
    font-family: PFont-Light;
  ${({ show }) => show
    ? css`
        margin-left: 20px;
        `
    : css`
          margin-left: 30px;
      ` }
    @media only screen and (min-width: 960px){
    }
`
export const Container = styled.div`
  background-color: ${BGColor};
  @media (max-width: 769px) {
    /* flex-direction: ${({ direction }) => direction || 'column'}; */
  }
`
export const Avatar = styled.img`
    height: 4rem;
    width: 4rem;
    min-height: 4rem;
    max-height: 4rem;
    min-width: 4rem;
    max-width: 4rem;
    position: absolute;
    top: -28px;
    left: 10%;
    object-fit: contain;
    border-radius: 50%;
    background-color: ${PColor};
    border: 3px solid ${BGColor};
`
export const MediaValue = styled.span`
  font-size: 1.5em;
  margin-right: 10px;
  color: #3f3e3e;
  font-family: PFont-Light;
`
export const ContentGrid = styled.div`
      display: grid;
    grid-template-columns: repeat( auto-fit,minmax(250px,1fr) );
    width: 90%;
    grid-gap: 19px 12px;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
`
export const Content = styled.div`
  grid-template-columns: 1fr 80%;
  grid-gap: 15px;
  padding: 15px;
  display: grid;
`
export const WrapperRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33.33%, 1fr));
    ${({ margin }) => margin && css`margin: ${margin};`}


`
export const ContentAction = styled.div`
  height: 30%;
  padding: 20px;
  border-top: .5px solid #eaeaea ;
`
export const CtnItems = styled.div`
    margin: auto;
    margin: 50px 0px;
    place-content: center;
    display: grid;
    gap: 5px;
    grid-template-columns: 50% repeat(auto-fill, 50%);
`
export const Card = styled.div`
  display: ${({ display }) => display || 'flex'};
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
  height: ${({ height }) => height || 'min-content'};
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ justify }) => justify || 'initial'};
  padding: ${({ padding }) => padding || '1%'};
  position: relative;
  ${({ radius }) => radius && css`border-radius: ${radius};`}
  ${({ overflow }) => overflow && css`overflow: ${overflow};`}
  transition: .5s ease;  
  margin: ${({ margin }) => margin || '0'};
  background-color: #e0f2df;
  ${props => props.active ? css`border: 3px solid ${PVColor};` : css`border: 3px solid transparent;`}
  box-shadow: 0px 0px 14px #00000017;
  flex-direction: ${({ direction }) => direction || 'row'};
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  ${props => props.animation && css`
    &:hover {
      transform: scale(1.2); 
      z-index: 9999;
    }  
  ` }
`
export const CircleUser = styled.div`
  border: 1px solid #ccc;
  border-radius: 50%;
  height:70px;
  width: 70px;
  max-height:70px;
  max-width: 70px;
  position: absolute;
  left: 0;
  right: 0;
  place-content: center;
  display: grid;
  background-color: ${BGColor};
  margin: auto;
  bottom: -35px;
`
export const CardPrimary = styled.div`
    margin: auto;
    justify-content: center;
    background-color: ${({ bgColor }) => bgColor || BGColor};
    padding: ${({ padding }) => padding || '0px'};
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    border-radius: 8px;
    
    `
export const ContentListInvoice = styled.div`
  padding: 30px;
  margin-top: 40px;
`
export const FilterOptions = styled.div`
    box-sizing: border-box;
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    z-index: 2;
    width: calc(100% + 40px);
    padding: 25px 20px 10px 20px;
    margin: -20px -20px 0 -20px;
    position: sticky;
    margin-bottom: 30px;
    top: 0px;
    margin-top: -30px;
    border-bottom: 1px solid #ccc;
`
export const Toast = styled.div`
    animation: ${({ open }) => open && (open ? fadeIn : fadeOut)} 1s forwards;
    height: 89px;
    top: -50%;
    background-color: #50a773;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    align-items: center;
    width: 100%;
    margin: auto;
    padding: 30px;
    z-index: 999999999;
    transition: 400ms;
    box-shadow: 0px 0px 6px #00000052;
    color: ${BGColor};
`
export const DownLoadButton = styled.button`
    box-sizing: border-box;
    margin: 0;
    width: 200px;
    overflow: visible;
    text-transform: none;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid hsla(0,0%,100%,.9);
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
    font-size: 13px;
    transition: all;
    transition-duration: .3s;
    margin-left: 10px;
`
export const Header = styled.div`
  background-color: #cb1d6c;
  padding: 20px;
  display: block;
`
export const HeadCategory = styled.div`
  height: auto;
  background-color: ${BGColor};
  width: 100%;
  margin: 35px 0;
  box-shadow: inset 0 -1px 0 #dcdcdc;
  & > button {
    background-color: ${BGColor};
  }
`

export const HeadSticky = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 5px 0;
    width: 100%;
`
export const ContentInfo = styled.div`
    overflow-y: auto;
    height: 700px;
    /* min-height: 400px; */
    max-height: 700px;
`
export const Text = styled.span`
    margin: 0;
    color: #3f3e3e;
    font-size: ${({ size }) => size || '1.5rem'};
    text-align:  ${({ align }) => align || 'start'};
    height: min-content;
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    font-weight: 400;
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || '#3f3e3e   '};
    font-family: ${({ font }) => font || 'PFont-Light'};
    word-break: break-word;
`
// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: '30px'
  },
  title: {
    fontSize: '30px',
    padding: '30px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '25% repeat(auto-fill, 24%)'

  }
})

export const ButtonTheme = styled.div`
    width: 65px;
    min-width: 65px;
    cursor: pointer;
    height: 24px;
    background-color: ${SECColor};
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
export const SwitchButton = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    position: absolute;
    ${({ active }) => active && css`left: ${active};`}
    transition: .3s ease;
`
export const ContentToggle = styled.div`
    align-items: center;
    display: flex;
    height: min-content;
    justify-content: center;
`
export const TableButton = styled.button`
    display:flex;
    padding:5px;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 10px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 4px;
    border:none;
    outline: none;
    color:${({ color }) => color === 1 ? '#1db9aa' : color === 2 ? 'red' : color || null};
    font-size: 12px;
    font-weight:bold;
    :hover{
        cursor:pointer;
    }
`
export const CardOverFloW = styled.div`
  overflow-y: auto;

`
export const CardDevice = styled.button`
    align-items: center;
    display: flex;
    min-height: 69px;
    padding: 0.9375rem 1.25rem;
    position: relative;
    text-align: left;
    background: none;
    border: 0;
    border: 1px solid #ccc;
    width: 100%;
    .device__icon{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    font-family: Sul Sans,sans-serif;
    }
    .device__info{
      margin-left: 1.3125rem;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    font-family: Sul Sans,sans-serif;
    }
    .device__description-wrapper{
      align-items: baseline;
      display: flex;
    }
    .device__description{
      color: #3e3e3e;
    margin-right: 0.5rem;
    font-size: 1rem;
    line-height: 1.375rem;
    }
    .device__current{
      color: #50a773;
      font-size: .75rem;
    line-height: 1rem;
    font-weight: 500;
    }
    .device__localization {
      color: #717171;
      font-size: .875rem;
    line-height: 1.25rem;
    }
`
export const LateralModal = styled.div`
    width: 380px;
    height: calc(100vh - 60px);
    position: fixed;
    bottom: 0;
    z-index: 900;
    transition: all 350ms cubic-bezier(.32,1.25,.32,1);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: 1px solid #d4d7dc;
    border-top: none ;
    background-color: #fff;
    right: 0;
    animation-duration: .3s;
    animation-fill-mode: both;
    border-left: 1px solid #d4d7dc;
    z-index: 1000;
    ${({ openSchedule }) => openSchedule
        ? css`
                 animation-name: ${SideIn};
                 visibility: visible;
                 opacity: 1;
                 transform: translateY(0);
                 `
        : css`
            animation-name: ${SlideInLeft};
            /* transform: translateY(0); */
            /* visibility: hidden; */
              `}

`
export const TimeSlotsList = styled.div`
    display:flex;
    flex-wrap:wrap;
`
export const TimeSlots = styled.div`
    margin: 10px 10px 0px 0px;
    border-radius: 4px;
    padding: 6px 15px;
    background-color:#d9534f;
    color: RED;

`
export const ContentCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  place-content: start;
  width: 100%;
  

`