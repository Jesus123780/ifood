import Planes from '../../container/Restaurant/planes'

export default function RestaurantPlanesView() {
  return (
    <Planes />
  )
}

RestaurantPlanesView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
