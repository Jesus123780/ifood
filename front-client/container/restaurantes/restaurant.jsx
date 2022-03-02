import React from 'react'
import { RippleButton } from '../../components/Ripple'
import { CardProduct, ContainerCardProduct, ContainerFilter, Content, ContentStores, H2, ItemCategory, ItemFilter, ItemWrapper, List, MerchantListWrapper } from './styled';
import Link from 'next/link'
import Image from 'next/image'
import { IconLove } from '../../public/icons';
import { PVColor } from '../../public/colors';
export const ListRestaurant = ({ data, catStoreId }) => {
  return (
    <Content>
      <MerchantListWrapper>
        {data?.map(x => {
          const nameStore = x.storeName?.replace(/\s/g, '-')
          return (
            <Link key={x.idStore} passHref shallow
              href={catStoreId ? {
                pathname: `/delivery/${x?.city?.cName?.toLocaleLowerCase()}-${x?.department?.dName?.toLocaleLowerCase()}/${nameStore}/${x.idStore}`,
                query: { categories: catStoreId },
              } : `delivery/${encodeURIComponent(x?.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(x?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(nameStore)}/${x?.idStore}`}
            >
              <a>
                <ItemWrapper key={x.idStore}>
                  <div>
                    <button type='button' onClick={() => {}}>
                      <IconLove color={PVColor} size={15} />
                    </button>
                    <Image
                      className='store_image'
                      width={100}
                      height={100}
                      src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                      alt="Picture of the author"
                      blurDataURL="data:..." automatically provided
                      placeholder="blur" // Optional blur-up while loading
                    />
                  </div>
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
