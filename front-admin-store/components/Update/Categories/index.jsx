import PropTypes from 'prop-types'
import { useState } from 'react'
import { InputHook } from './Input'
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../assets/icons/icons'
import { APColor, PColor, PVColor } from '../../../assets/colors'
import { RippleButton } from '../../Ripple'
import { TextAreaHooks } from '../../TextTareaHook'
import { Loading } from '../../Loading'
import {
  Container,
  FormProducts,
  Card,
  Button,
  CardOne,
  ContainerCardProduct,
  CardProduct,
  Img,
  ContentImg,
  Title,
  Text,
  ContentInfo,
  ContentIconFav,
  ButtonCard,
  ActionName,
  ReadMore,
  ContentProducts
} from './styled'
import { Skeleton } from '../../Skeleton/SkeletonCard'

export const Categories = ({
  search,
  handleChangeFilter,
  data,
  setShowMore,
  values,
  handleRegister,
  handleChange,
  loading,
  handleDelete
}) => {
  const [stateCard, setState] = useState(false)
  const handleClick = () => {
    setState(!stateCard)
  }
  return (<div>
    {loading && <Loading />}
    <Container>
      <CardOne state={stateCard}>
        <Text size='30px'>Registra una categoría</Text>
        <FormProducts onSubmit={handleRegister}>
          <InputHook
            label='Nombre de la categoría'
            name='cpName'
            onChange={handleChange}
            range={{ min: 0, max: 700 }}
            value={values.cpName}
          />
          <TextAreaHooks
            name='Metadata'
            onChange={handleChange}
            range={{ min: 0, max: 7000 }}
            showRange
            title='Metadata'
            value={values.Metadata}
          />
          <RippleButton
            bgColor={APColor}
            margin='20px auto'
            type='submit'
            widthButton='100%'
          >Subir</RippleButton>
        </FormProducts>
      </CardOne>
      <i style={{ position: 'relative' }}>
        <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
      </i>
      <Card bgColor='#ededed' state={stateCard}>
        <ContentProducts>
          <InputHook
            label='Filtrar las categorías'
            name='search'
            onChange={handleChangeFilter}
            range={{ min: 0, max: 20 }}
            type='text'
            value={search}
          />
          <Text size='30px'>Lista de categorías registrados</Text>
          <ContainerCardProduct>
            {!data?.length ? <SkeletonP /> : data?.map(product => {return (
              <CardProduct key={product.caId} >
                <ButtonCard onClick={() => {return handleDelete(product?.caId)}}>
                  <IconDelete color={PColor} size={20} />
                  <ActionName >
                                        Eliminarais
                  </ActionName>
                </ButtonCard>
                <ButtonCard delay='.1s' top={'80px'}>
                  <IconEdit color={PColor} size={20} />
                  <ActionName>
                                        Editar
                  </ActionName>
                </ButtonCard>
                <ContentImg>
                  {!product.ProImage ? <i>Cargando</i> : <Img alt={product.ProImage} src={product.ProImage} />}
                </ContentImg>
                <ContentInfo>
                  <ContentIconFav>
                    <IconLove color={PVColor} size={20} />
                  </ContentIconFav>
                  <Title>{product.cpName}</Title>
                </ContentInfo>
              </CardProduct>
            )})}
          </ContainerCardProduct>
          <ReadMore onClick={() => {return setShowMore(s => {return s + 5})}}>CARGAR MÁS </ReadMore>
        </ContentProducts>
      </Card>
    </Container>
  </div>
  )
}

Categories.propTypes = {
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  handleChange: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleDelete: PropTypes.func,
  handleRegister: PropTypes.any,
  loading: PropTypes.any,
  search: PropTypes.any,
  setShowMore: PropTypes.func,
  values: PropTypes.shape({
    Metadata: PropTypes.any,
    cpName: PropTypes.any
  })
}
export const SkeletonP = () => {
  return <>
    <>
      {[1, 2, 3, 4].map((x, i) => {return (
        <CardProduct key={i + 1}>
          <Skeleton />
        </CardProduct>
      )})}
    </>
  </>
}