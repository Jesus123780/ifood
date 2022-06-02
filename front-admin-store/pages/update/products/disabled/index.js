import { ListProducts } from 'components/Update/Products/ListProducts'
import { useGetProductsFood } from 'hooks/useProductsFood'

export default function ProductsDisabled() {
  let search = ''
  const [data, { loading, error, fetchMore, setShowMore, showMore }] = useGetProductsFood({ search })

  return (<ListProducts
    data={data}
    error={error}
    fetchMore={fetchMore}
    loading={loading}
    pState={0}
    setShowMore={setShowMore}
    showMore={showMore}
  />)
}
