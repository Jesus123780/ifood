import Bankdata from '../../container/Restaurant/Bankdata'

export default function RestaurantPlanesView() {
  return (
    <Bankdata />
  )
}

RestaurantPlanesView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
