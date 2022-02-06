import React, { useContext, useState } from 'react';
import { AsideCheckout } from '../../components/AsideCheckout';
import { AwesomeModal } from '../../components/AwesomeModal';
import { useSetState } from '../../components/hooks/useState';
import { RippleButton } from '../../components/Ripple';
import { Context } from '../../context';
import { PColor } from '../../public/colors';
import { AddPlusCircle, IconPlus } from '../../public/icons';
import { CardProduct, ContainerCardProduct, ContainerFilter, Content, ContentStores, H2, ItemCategory, ItemFilter, ItemWrapper, List, MerchantListWrapper } from './styled';
import Link from 'next/link'
import Image from 'next/image'
export const ListRestaurant = () => {
  const data = [
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
    {
      idStore: 1,
      storeName: 'Remo',
      location: 'location',

    },
  ]
  return (
    <Content>
      <MerchantListWrapper>
        {data?.map(x => (
          <Link href={`delivery/${x.location}/${x.storeName}/${x.idStore}`}>
            <a>
              <ItemWrapper key={x.idStore}>
                <Image
                  width={100}
                  height={100}
                  src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                  alt="Picture of the author"
                  blurDataURL="data:..." automatically provided
                  placeholder="blur" // Optional blur-up while loading

                />
                {x.storeName}
              </ItemWrapper>
            </a>
          </Link>
        ))}
      </MerchantListWrapper>
      <RippleButton widthButton='100%'>Ver más</RippleButton>
    </Content>
  );
};
