import React, { useContext, useEffect, useState } from 'react'
import { AsideCheckout } from '../../components/AsideCheckout'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import { RippleButton } from '../../components/Ripple'
import { Context } from '../../context'
import { PColor } from '../../public/colors'
import { AddPlusCircle, IconPlus } from '../../public/icons'
import { CardProduct, ContainerCardProduct, ContainerFilter, Content, ContentStores, H2, ItemCategory, ItemFilter, ItemWrapper, List, MerchantListWrapper } from './styled';
import Link from 'next/link'
import Image from 'next/image'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ALL_RESTAURANT } from './queries'
export const ListRestaurant = () => {
  const [dataStore, setData] = useState([])
  const [showMore, setShowMore] = useState(100)
  const [getAllStoreInStore, { data }] = useLazyQuery(GET_ALL_RESTAURANT)
  /* Filtro  */
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  const [filter, setFilter] = useState({ gender: [], desc: [], speciality: [] })
  useEffect(() => {
    // setData([data?.getAllStoreInStore])
  }, [searchFilter])
  useEffect(() => {
    getAllStoreInStore({ variables: { max: showMore } })
  }, [searchFilter, showMore])
  return (
    <Content>
      <MerchantListWrapper>
        {data?.getAllStoreInStore?.map(x => {
          const nameStore = x.storeName?.replace(/\s/g, '-')
          return (
            <Link href={`delivery/${x?.city?.cName?.toLocaleLowerCase()}-${x?.department?.dName?.toLocaleLowerCase()}/${nameStore}/${x?.idStore}`}>
              <a>
                <ItemWrapper key={x.idStore}>
                  <Image
                    className='store_image'
                    width={100}
                    height={100}
                    src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                    alt="Picture of the author"
                    blurDataURL="data:..." automatically provided
                    placeholder="blur" // Optional blur-up while loading

                  />
                  <div>
                    <h2 className="Name">{x.storeName}</h2>
                    {/* <span className="store_info">{x.cateStore?.cName}</span> */}
                  </div>
                </ItemWrapper>
              </a>
            </Link>
          )
        })}
      </MerchantListWrapper>
      <RippleButton onClick={(z) => setShowMore(z + 100)} widthButton='100%'>Ver más</RippleButton>
    </Content>
  );
};
