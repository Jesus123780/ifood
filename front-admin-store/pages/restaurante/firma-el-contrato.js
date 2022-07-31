import ContractSignature from '../../container/Restaurant/FirmaElcontrato'

export default function RestaurantFirm() {
  return (
    <ContractSignature />
  )
}


RestaurantFirm.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
