import PropTypes from 'prop-types'
import { useState } from 'react'
import { Rate } from '../../Rate'
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils'
import { RippleButton } from '../../Ripple'
import {
  Container,
  FormProducts,
  CardOne,
  Label,
  CardProduct,
  Text
} from './styled'
import { APColor, PVColor, SEGColor } from '../../../public/colors'
import InputHooks from '../../InputHooks/InputHooks'
import { Skeleton } from 'components/Skeleton/SkeletonCard'

export const Kit = ({
  values,
  handleRegister,
  handleChange,
  countries,
  setRating,
  rating,
  color,
  size,
  onChangeSearch,
  departments,
  cities,
  setName,
  names
  // filtro
}) => {
  const [modal, setModal] = useState(0)
  const handleClickModal = index => {
    setModal(index === modal ? true : index)
  }
  return (<div>
    <Container>
      <CardOne state={false}>
        <FormProducts onSubmit={handleRegister}>
          <InputHooks
            label='Nombre del producto'
            name='pName'
            onChange={e => {return setName(e.target.value)}}
            placeholder='Nombre del producto'
            range={{ min: 0, max: 180 }}
            required
            type='text'
            value={names}
          />
          <InputHooks
            label='ProPrice'
            name='ProPrice'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            required
            value={numberFormat(values.ProPrice)}
          />
          <InputHooks
            label='Descuento'
            name='ProDescuento'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProDescuento}
          />
          <InputHooks
            label='Unidades Disponibles'
            name='ProUniDisponibles'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProUniDisponibles}
          />
          <InputHooks
            label='Producto Protegido'
            name='ProProtegido'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProProtegido}
          />
          <InputHooks
            label='Garantia'
            name='ProAssurance'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProAssurance}
          />
          <>
            <Rate
              onRating={rate => {return setRating(rate)}}
              rating={rating}
              size={20}
              value={values.rating}
            />
            <InputHooks
              label='Ancho'
              name='Width'
              numeric
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Width}
            />
            <InputHooks
              label='Alto'
              name='Height'
              numeric
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Height}
            />
            <InputHooks
              label='Largo'
              name='ProLength'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProLength}
            />
            <InputHooks
              label='Peso'
              name='ProWeight'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProWeight}
            />
            <InputHooks
              label='Cantidad # Disponible'
              name='Cantidad'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Cantidad}
            />
            <InputHooks
              label='Destacado'
              name='Destacado'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Destacado}
            />
            <InputHooks
              label='Envio gratis?'
              name='IstFree'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.IstFree}
            />
            <InputHooks
              label='Voltaje'
              name='ProVoltaje'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProVoltaje}
            />
            <NewSelect
              id='colorId'
              name='colorId'
              onChange={handleChange}
              optionName='colorName'
              options={color}
              title='Color'
              value={values?.colorId}
            />
            <NewSelect
              id='sizeId'
              name='sizeId'
              onChange={handleChange}
              optionName='sizeName'
              options={size}
              title='Talla'
              value={values?.sizeId}
            />
            <NewSelect
              id='cId'
              name='countryId'
              onChange={onChangeSearch}
              optionName='cName'
              options={countries}
              title='País'
              value={values?.countryId}
            />
            <NewSelect
              id='dId'
              name='dId'
              onChange={onChangeSearch}
              optionName='dName'
              options={departments}
              title='Departamento'
              value={values?.dId}
            />
            <NewSelect
              id='ctId'
              name='ctI d'
              onChange={handleChange}
              optionName='cName'
              options={cities}
              title='Ciudad'
              value={values?.ctId}
            />
            <Text size='30px'>Registra el producto en una categoria</Text>
          </>
          <RippleButton
            bgColor={SEGColor}
            margin='20px auto'
            onClick={() => {return handleClickModal(1)}}
            type='button'
            widthButton='100%'
          > <Label>Características principales</Label></RippleButton>
          <RippleButton
            bgColor={PVColor}
            margin='20px auto'
            onClick={() => {return handleClickModal(2)}}
            type='button'
            widthButton='100%'
          > <Label>Registrar Características principales</Label></RippleButton>
          <RippleButton
            bgColor={APColor}
            margin='20px auto'
            type='submit'
            widthButton='100%'
          >Subir</RippleButton>
        </FormProducts>
      </CardOne>

    </Container>
  </div>
  )
}

Kit.propTypes = {
  cities: PropTypes.any,
  color: PropTypes.any,
  countries: PropTypes.any,
  data: PropTypes.any,
  dataCategories: PropTypes.any,
  dataFree: PropTypes.any,
  datafatures: PropTypes.any,
  departments: PropTypes.any,
  dispatch: PropTypes.any,
  features: PropTypes.any,
  finalDataAreas: PropTypes.any,
  handleAddFeature: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeClick: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleDelete: PropTypes.any,
  handleRegister: PropTypes.any,
  intPorcentaje: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onChangeSearch: PropTypes.any,
  onClickClear: PropTypes.any,
  onClickSearch: PropTypes.any,
  rating: PropTypes.any,
  search: PropTypes.any,
  setLocalStorage: PropTypes.any,
  setName: PropTypes.func,
  setRating: PropTypes.func,
  setShowMore: PropTypes.any,
  size: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    Cantidad: PropTypes.any,
    Destacado: PropTypes.any,
    Height: PropTypes.any,
    IstFree: PropTypes.any,
    ProAssurance: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProLength: PropTypes.any,
    ProPrice: PropTypes.any,
    ProProtegido: PropTypes.any,
    ProUniDisponibles: PropTypes.any,
    ProVoltaje: PropTypes.any,
    ProWeight: PropTypes.any,
    Width: PropTypes.any,
    colorId: PropTypes.any,
    countryId: PropTypes.any,
    ctId: PropTypes.any,
    dId: PropTypes.any,
    rating: PropTypes.any,
    sizeId: PropTypes.any
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