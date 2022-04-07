import React from 'react'
import { Content, ItemWrapper, MerchantListWrapper } from './styled';
import Link from 'next/link'
import Image from 'next/image'
import { IconLove, IconLoveFill, IconRate } from '../../public/icons';
import { PVColor, WColor } from '../../public/colors';
import { PUSH_RECOMMENDED } from 'gql/Recommendation';
import { useMutation } from '@apollo/client';

export const ListRestaurant = ({ data, catStoreId, like }) => {
  const [pushOneRecommendation] = useMutation(PUSH_RECOMMENDED, {
    context: { clientName: "main" }
  })
  return (
    <Content>
      <MerchantListWrapper>
        {data && data?.map(x => {
          const nameStore = x.storeName || x?.getOneStore?.storeName?.replace(/\s/g, '-').toLocaleLowerCase()
          let city = like && x?.getOneStore?.city?.cName.toLocaleLowerCase()
          let suma = 0
          const avg = x?.getAllRatingStar?.map((x, index) => (suma += x.rScore) / (index + 1))
          return (
            <Link
            
              key={x.idStore || x.fIStoreId}
              passHref
              shallow
              href={catStoreId ? {
                pathname: `/delivery/${city || x?.city?.cName?.toLocaleLowerCase()}-${x?.department?.dName?.toLocaleLowerCase()}/${nameStore}/${x.idStore}`,
                query: { categories: catStoreId },
              } : `/delivery/${encodeURIComponent(city || x?.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(x?.department?.dName || x?.getOneStore?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(nameStore)}/${x?.idStore}`}
            >
              <a>
                <ItemWrapper key={x.idStore} onClick={() => pushOneRecommendation({ variables: { input: { id: '', carProId: !like ? x.catStore : x.getOneStore.catStore } } })} >
                  <div>
                    <Image
                      className='store_image'
                      width={100}
                      height={100}
                      src={x.Image || '/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                      alt="Picture of the author"
                      // blurDataURL="data:..."
                      // placeholder="blur" // Optional blur-up while loading
                    />
                  </div>
                  <div>
                    <h2 className="Name">{x?.getOneStore?.storeName || x.storeName}</h2>
                    { <span className="store_info">{x?.cateStore?.cName || x.getOneStore?.cateStore?.cName}   {avg?.length > 0 && <><IconRate color={WColor} size={18} /> {avg[avg.length - 1]?.toFixed(1)}</>} </span>}
                  </div>
                  {x.fState === 1 && <IconLoveFill color={PVColor} size={20} />}
                </ItemWrapper>
              </a>
            </Link>
          )
        })}
      </MerchantListWrapper>
    </Content>
  );
};
