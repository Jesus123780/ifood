import CodeValidation from '../../container/Restaurant/ValidacionDeCodigo'

export default function RestaurantPlanesView() {
  return (
    <CodeValidation />
  )
}

RestaurantPlanesView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}