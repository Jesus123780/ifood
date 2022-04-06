import { useLazyQuery, useQuery } from '@apollo/client';
import { Container, ContainerProduct, Title } from './styled';
import { GET_ONE_STORE_IN_CATEGORY } from 'container/categoryStores/queries';
import { useContext, useEffect, useState } from 'react';
import { GET_ALL_PRODUCT_STORE, GET_ALL_STORE_RECOMMENDED } from 'gql/Recommendation';
import { ListRestaurant } from 'container/restaurantes/restaurant';
import { RippleButton } from 'components/Ripple';
import CardProduct from 'container/RestaurantProfile/CardProducts';
import { Context } from 'context';
import Link from 'next/link'

// It may interest you
export const LastRecommended = ({ ID_CATEGORIE }) => {
    const [getOneCatStore, { data: dataCatSto }] = useLazyQuery(GET_ONE_STORE_IN_CATEGORY)
    const { data: dataStoreRecommended } = useQuery(GET_ALL_STORE_RECOMMENDED, {
        variables: {
            catStore: ID_CATEGORIE,
        }
    })
    const [categoryStores, setDataCatStore] = useState({})
    useEffect(() => {
        getOneCatStore({
            variables: {
                catStore: ID_CATEGORIE
            }
        }).catch((e) => console.log(''))
        setDataCatStore(dataCatSto?.getOneCatStore)
    }, [ID_CATEGORIE, dataStoreRecommended, dataCatSto])
    const { cName } = categoryStores || {}
    return (
        <Container>
            {dataStoreRecommended?.getAllMatchesStoreRecommended.length > 0 &&
                <>
                    <Title>Basado en tu última visita en {cName}  te recomendamos</Title>
                    <ListRestaurant
                        data={dataStoreRecommended?.getAllMatchesStoreRecommended || []}
                    />
                </>}
        </Container>
    )
}

export const ItMayInterestYou = ({ PRODUCT_NAME_COOKIE }) => {
    const { setAlertBox, openProductModal, setOpenProductModal, handleProductModal } = useContext(Context)
    let name = PRODUCT_NAME_COOKIE
    name = name?.split(" ")[0]
    // name = name[0]
    const { data: dataProduct, fetchMore } = useQuery(GET_ALL_PRODUCT_STORE, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        nextFetchPolicy: 'cache-first',
        refetchWritePolicy: 'merge',
        variables:
        {
            max: 4,
            search: name,
        }
    })
    return (
        <Container>
            <Title>Te puede interesar {name} </Title>
            {!!name && <ContainerProduct>
                {dataProduct?.productFoodsAllRecommended?.length > 0 && dataProduct?.productFoodsAllRecommended?.map(food => (
                    <div>
                        {<Link
                            passHref
                            shallow
                            replace
                            href={{
                                pathname: `/restaurantes`,
                                query: { plato: food.pId }
                            }} >
                            <a>
                                <CardProduct food={food} key={food.pId} onClick={() => setOpenProductModal(!openProductModal)} />
                            </a>
                        </Link>}
                    </div>
                ))}
            </ContainerProduct>}
        </Container>
    )
}
