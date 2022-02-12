import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Rate } from 'components/Rate'
import Image from 'next/image'
import { PColor } from 'public/colors'
import { IconShopping } from 'public/icons'
import React from 'react'
import styled from 'styled-components'
import { Content, MediaValue, Text } from './styled'

export const OurFood = () => {
  return (
    <MainCard noneShadow={true} title={'Sobre Su comida'}>
      <WrapSlide>

        {[1, 2, 3, 4, 5].map((item => (
          <Box key={item._id}>
            <Image
              className='store_image'
              width={100}
              objectFit='contain'
              height={100}
              src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
              alt={"Picture of the author"}
              blurDataURL="/images/DEFAULTBANNER.png"
              placeholder="blur" // Optional blur-up while loading
            />
            <Text size='1em' color='#3f3e3e'>Buen sabor</Text>
          </Box>
        )))}
      </WrapSlide>
    </MainCard>
  )
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    .store_image {
      border-radius: 50%;
      border: 1px solid;
    }
    `
const WrapSlide = styled(Box)`
    flex-direction: row;
    width: 100%;
    display: flex;
`