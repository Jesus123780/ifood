
import PropTypes from 'prop-types'
import {     
  IconColombia,
  IconVenezuela,
  IconParaguay,
  IconBrazil,
  IconCostaRica,
  IconCuba,
  IconMéxico,
  IconPeru,
  IconPanama,
  IconRepublDom } from '../../../../public/icons'

export const IconProcesador = ({ style = {}, size }) => {return <svg
  height={size}
  style={style}
  viewBox='0 0 67.71 66.23'
  width={size}
><rect
    fill='none'
    height='43.44'
    rx='3.48'
    stroke='#000'
    strokeMiterlimit='30'
    width='48.36'
    x='10.35'
    // eslint-disable-next-line react/jsx-closing-bracket-location
    y='11.39' />
  <rect
    fill='none'
    height='29.24'
    rx='3.48'
    stroke='#000'
    strokeMiterlimit='14'
    width='32.55'
    x='18.25'
    y='18.49'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='53.65'
    x2='67.71'
    y1='21.72'
    y2='21.72'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='53.65'
    x2='67.71'
    y1='33.11'
    y2='33.11'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='53.65'
    x2='67.71'
    y1='44.51'
    y2='44.51'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x2='14.06'
    y1='21.72'
    y2='21.72'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x2='14.06'
    y1='33.11'
    y2='33.11'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x2='14.06'
    y1='44.51'
    y2='44.51'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='24.53'
    x2='24.53'
    y1='14.06'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='35.92'
    x2='35.92'
    y1='14.06'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='47.32'
    x2='47.32'
    y1='14.06'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='23.14'
    x2='23.14'
    y1='66.23'
    y2='52.17'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='34.53'
    x2='34.53'
    y1='66.23'
    y2='52.17'
  /><line
    fill='none'
    stroke='#000'
    strokeMiterlimit='30'
    x1='45.92'
    x2='45.92'
    y1='66.23'
    y2='52.17'
  /><path d='M76,87.76v.92h3.82l0,.9H76V92.3h1V90.46h1.74l1.08,1.84H81l-1-1.79c.48,0,1-.26,1-.64V88.46c0-.38-.42-.7-1-.7Zm5.73,0,1.93,2.77V92.3h.88V90.53l2.06-2.77H85.48l-1.34,1.77-1.31-1.77Zm5.84,0v.92h3.2l-3.2,2.73v.89h4.62v-.89H89l3.19-2.73v-.92Zm5.88,0v.92h4.6v-.92Zm6.89,0h-1V92.3h1v-3l2.62,3h1V87.76h-1v3Zm-6.89,1.82V92.3h4.6v-.89H94.4v-.93h3.69v-.9Z' transform='translate(-55.47 -56.89)'/></svg>}

IconProcesador.propTypes = {
  size: PropTypes.any,
  style: PropTypes.object
}
export const icons = [
  { cCalCod: 1, icon: <IconProcesador size={30} /> },
  { cCalCod: 51, icon: <IconPeru size={40} /> },
  { cCalCod: 52, icon: <IconMéxico size={40} /> },
  { cCalCod: 53, icon: <IconCuba size={40} /> },
  { cCalCod: 55, icon: <IconBrazil size={40} /> },
  { cCalCod: 57, icon: <IconColombia size={40} /> },
  { cCalCod: 58, icon: <IconVenezuela size={40} /> },
  { cCalCod: 406, icon: <IconCostaRica size={40} /> },
  { cCalCod: 595, icon: <IconParaguay size={40} /> },
  { cCalCod: 407, icon: <IconPanama size={40} /> },
  { cCalCod: 1809, icon: <IconRepublDom size={40} /> }

]