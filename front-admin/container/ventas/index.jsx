import { LocationName } from 'components/hooks/useLocationName'
import { Container } from './styled'
import { ListVentas } from './ListVentas'
import GenerateSales from 'container/Sales'

const VentasStores = () => {

  return (
    <div>
      <Container>
        <GenerateSales />
        <LocationName />
        <ListVentas />
      </Container>
    </div>
  )
}

VentasStores.propTypes = {}

export default VentasStores