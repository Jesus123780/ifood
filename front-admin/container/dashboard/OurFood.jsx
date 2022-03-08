import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Rate } from 'components/Rate'
import Image from 'next/image'
import { PColor } from 'public/colors'
import { IconShopping } from 'public/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Content, MediaValue, Text } from './styled'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_All_RATING_STORE } from './queriesStore'

export const OurFood = () => {
  const { data: dataRating, loading: loadRating } = useQuery(GET_All_RATING_STORE)
  const [appearance, SetAppearance] = useState(0);
  const [rTasty, setTasty] = useState(0);
  const [rGoodTemperature, setGoodTemperature] = useState(0);
  const [rGoodCondition, setGoodCondition] = useState(0);
  useEffect(() => {
    let rGoodCondition = 0
    let goodCondition = 0
    let goodTemperature = 0
    let rTasty = 0
    let totalAppearance = 0, numeros = [1, 2, 3, 4, 5];
    dataRating?.getAllRating?.forEach(function (a) {
      totalAppearance += a.rAppearance
      rTasty += a.rTasty
      rGoodCondition += a.rGoodCondition
      goodTemperature += a.rGoodTemperature
    });
    SetAppearance(totalAppearance)
    setTasty(rTasty)
    setGoodTemperature(goodTemperature)
    setGoodCondition(rGoodCondition)
  }, [dataRating])
  
  const dataArr = [
    {
      name: 'Buena apariencia',
      value: appearance,
    },
    {
      name: 'Es deliciosa',
      value: rTasty,
    },
    {
      name: 'Buenas condiciones',
      value: rGoodCondition,
    },
    {
      name: 'Buena temperatura',
      value: rGoodTemperature,
    },
  ]
  return (
    <MainCard noneShadow={true} title={'Sobre Su comida'}>
      <WrapSlide>
        {dataArr?.map((item => (
          <Box key={item._id}>
            <Image
              className='store_image'
              width={100}
              objectFit='cover'
              height={100}
              src={'/images/202109081904_64O5_i.webp'}
              alt={"Picture of the author"}
              blurDataURL="/images/DEFAULTBANNER.png"
              placeholder="blur"
            />
            <Text size='1em' color='#3f3e3e'>{item.name}</Text>
            <Text size='1em' color='#3f3e3e'>{item.value}</Text>
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