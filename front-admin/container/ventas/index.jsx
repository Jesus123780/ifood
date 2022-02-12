import { LocationName } from 'components/hooks/useLocationName'
import { Container } from './styled'
import { ListVentas } from './ListVentas'

const VentasStores = () => {
  return (
    <div>
      <Container>
        <LocationName />
        <ListVentas />
      </Container>
    </div>
  )
}

VentasStores.propTypes = {}

export default VentasStores