import React from 'react'
import PropTypes from 'prop-types'
import { Card } from './styled'
import Image from 'next/image'
import { APColor } from '../../../public/colors'
import { Text } from '../styled'
const myLoader = ({ src, width, quality }) => {
    return `https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_960_720.png`
}
const CardProduct = ({ food, onClick }) => {
    return (
        <Card onClick={onClick}>
            <div>
                <h3 className="card__description">{food.pName}</h3>
                <h3 className="card__description_main">{food.ProDescription}</h3>
                <div className='footer'>
                    <Text color={APColor}>{food.ProDelivery === 1 ? 'Envio Gratis' : ''}</Text>
                    <span className="card__price">$ {food.ProPrice}</span>
                    <span className="card__des" style={{ color: APColor }}>$ {food.ProDescuento}</span>
                </div>
            </div>
            <Image
                className='store_image'
                width={100}
                height={100}
                priority
                objectPosition='cover'
                // loader={!!food.ProImage && myLoader}
                layout='responsive'
                src={`${food.ProImage}`}
                alt={food.ProImage || "Picture of the author"}
                // blurDataURL="/images/DEFAULTBANNER.png"
                // placeholder="blur" // Optional blur-up while loading
            />
        </Card>
    )
}

CardProduct.propTypes = {}

export default CardProduct