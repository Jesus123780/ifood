import React from 'react'
import PropTypes from 'prop-types'
import { Card } from './styled'
import Image from 'next/image'
import { APColor } from '../../../public/colors'

const CardProduct = ({ food, onClick }) => {
    return (
        <Card onClick={onClick}>
            <div>
                <h3 className="card__description">{food.pName}</h3>
                <h3 className="card__description">{food.ProDescription}</h3>
                <div className='footer'>
                    <span className="card__price">$ {food.ProPrice}</span>
                    <span className="card__des" style={{ color: APColor }}>$ {food.ProDescuento}</span>
                </div>
            </div>
            <Image
                className='store_image'
                width={100}
                height={100}
                src={'/images/hamb.jpg'}
                alt={food.ProImage || "Picture of the author"}
                blurDataURL="/images/DEFAULTBANNER.png"
                placeholder="blur" // Optional blur-up while loading
            />
        </Card>
    )
}

CardProduct.propTypes = {}

export default CardProduct