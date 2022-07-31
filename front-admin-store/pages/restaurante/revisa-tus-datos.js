import CheckYourData from '../../container/Restaurant/CheckYourData'

export default function RestaurantPlanesView() {
  
  return (
    <CheckYourData />
  )
}

RestaurantPlanesView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}