import Contract from 'container/contract'
// import useSWR from 'swr'
const NestedLayout = (props) => {
  <div>
    Hola papu
    {props.children}
    
  </div>
}

export default function Contrato() {
  return <Contract />
}
Contrato.getLayout = function getLayout(page) {
  return (
    <div>
      <NestedLayout>{page}</NestedLayout>
    </div>
  )
}
