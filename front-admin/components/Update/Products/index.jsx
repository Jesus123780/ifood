import PropTypes from 'prop-types'
import { useState } from 'react'
import { InputHook } from './Input'
import { ViewProducts } from './ViewProducts'
import { Rate } from '../../Rate'
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils'
import { RippleButton } from '../../Ripple'
import {
  Container,
  FormProducts,
  Card,
  Button,
  CardOne,
  Label,
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
  ContentProducts,
  CardInput,
  CardCheckBox,
  CardRadioLabel,
  ContainerFilter,
  ItemFilter,
  ContainerBurger
} from './styled'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import { SliderAreas } from './SliderAreas'
import { Discount } from './ViewProducts/styled'
import { SliderCategory } from './SliderCategories'
import { LoadingBabel } from '../../Loading/LoadingBabel'
import { Range } from '../../InputRange'
import { SliderCategoryUpdate } from './SliderCategoriesUpdate'
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../public/icons'
import { APColor, PColor, PVColor, SEGColor } from '../../../public/colors'

export const Products = ({ 
  finalDataAreas,
  features,
  search,
  handleChangeFilter,
  data,
  setShowMore,
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
  names,
  loading,
  handleDelete,
  // filtro
  handleChangeClick,
  onClickClear,
  onClickSearch,
  dataCategories,
  state: grid,
  setLocalStorage,
  intPorcentaje,
  dataFree
}) => {
  const [stateCard, setState] = useState(false)
  const handleClick = () => {
    setState(!stateCard)
  }
  const [modal, setModal] = useState(0)
  const handleClickModal = index => {
    setModal(index === modal ? true : index)
  }
  return (<div>
    {loading && <LoadingBabel />}
    <Container>
      <CardOne state={stateCard}>
        <FormProducts onSubmit={handleRegister}>
          <InputHook
            label='Nombre del producto'
            name='pName'
            onChange={e => {return setName(e.target.value)}}
            placeholder='Nombre del producto'
            range={{ min: 0, max: 180 }}
            required
            type='text'
            value={names}
          />
          <InputHook
            label='ProPrice'
            name='ProPrice'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            required
            value={numberFormat(values.ProPrice)}
          />
          <InputHook
            label='Descuento'
            name='ProDescuento'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProDescuento}
          />
          <InputHook
            label='Unidades Disponibles'
            name='ProUniDisponibles'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProUniDisponibles}
          />
          <InputHook
            label='Producto Protegido'
            name='ProProtegido'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProProtegido}
          />
          <InputHook
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
            <img />
            <InputHook
              label='Ancho'
              name='Width'
              numeric
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Width}
            />
            <InputHook
              label='Alto'
              name='Height'
              numeric
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Height}
            />
            <InputHook
              label='Largo'
              name='ProLength'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProLength}
            />
            <InputHook
              label='Peso'
              name='ProWeight'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProWeight}
            />
            <InputHook
              label='Cantidad # Disponible'
              name='Cantidad'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Cantidad}
            />
            <InputHook
              label='Destacado'
              name='Destacado'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.Destacado}
            />
            <InputHook
              label='Envio gratis?'
              name='IstFree'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.IstFree}
            />
            <InputHook
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

            <Text size='30px'>Registra el producto en una categoría</Text>
            <SliderCategoryUpdate
              dataCategories={dataCategories}
              duration={'500ms'}
              handleChangeClick={handleChangeClick}
            />
            <div>
              <Text>Agregar Características principales</Text>
            </div>
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
      <i style={{ position: 'relative' }}>
        <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
      </i>
      <Card bgColor='#ededed' state={stateCard}>
        <ViewProducts
          Country={countries}
          PCant={values?.ProUniDisponibles}
          PDescription={values?.ProDescription}
          desc={values?.ProDescuento}
          features={features}
          intPorcentaje={intPorcentaje}
          price={values?.ProPrice}
          setRating={setRating}
          start={rating}
          valuesP={'name'}
        />
      </Card>
    </Container>
    <ContentProducts>
      <Text size='30px'>Filtrar productos</Text>
      <ContainerCardProduct>
        <CardProduct>
          <InputHook
            label='Busca tus productos'
            name='search'
            onChange={handleChangeFilter}
            range={{ min: 0, max: 20 }}
            type='text'
            value={search}
          />
          <i>Filtro de precio</i>
          <InputHook
            label={`${data[0]?.ProPrice}`}
            maxLength={data[0]?.ProPrice}
            // value={data[0]?.ProPrice}
            minLength={data[0]?.ProPrice}
            name='price'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            type='range'
          />
        </CardProduct>
        <CardProduct id='space'>
          <Text size='20px'>Filtrar productos</Text>
          <div>
            <CardInput onChange={handleChangeClick}>
              <div>
                <CardCheckBox
                  id='checkboxF'
                  name='gender'
                  type='checkbox'
                  value='1'
                />
              </div>
              <CardRadioLabel htmlFor='checkboxF'>Envío gratis</CardRadioLabel>
            </CardInput>
            <CardInput onChange={handleChangeClick}>
              <CardCheckBox
                id='checkboxF'
                name='desc'
                type='checkbox'
                value='1'
              />
              <CardRadioLabel htmlFor='checkboxF'>Ofertas</CardRadioLabel>
            </CardInput>
          </div>
          <RippleButton bgColor={PVColor} onClick={() => {return onClickSearch()}}>Buscar</RippleButton>
          <Range
            label='Year'
            max={2018}
            min={1962}
            value={2018}
          />
        </CardProduct>
        <CardProduct>
          <SliderCategory
            dataCategories={dataCategories}
            duration={'500ms'}
            handleChangeClick={handleChangeClick}
          />
          <RippleButton
            bgColor={PVColor}
            margin='5px 30px 30px 30px'
            onClick={() => {return onClickSearch()}}
          >Buscar</RippleButton>
        </CardProduct>
        <CardProduct>
          {dataCategories?.length}
          <RippleButton
            bgColor={PVColor}
            margin='5px 30px 30px 30px'
            onClick={() => {return onClickSearch()}}
          >Buscar</RippleButton>
        </CardProduct>
      </ContainerCardProduct>
      {/* Slider para filtrar productos */}
      <Text size='30px'>Lista de productos registrados</Text>
      <ContainerFilter>
        <ItemFilter onClick={() => {return setLocalStorage(grid)}}>
          <ContainerBurger>
            <div className='BurgerMenu__container' role='button' >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </ContainerBurger>
        </ItemFilter>
        <ItemFilter>Mejor precio</ItemFilter>
        <ItemFilter>Mayor precio</ItemFilter>
        <ItemFilter>Envio gratis</ItemFilter>
        <ItemFilter>Evaluacion</ItemFilter>
        <ItemFilter>Full envio</ItemFilter>
        <ItemFilter>Tarifa de envio</ItemFilter>
        <ItemFilter>Distancia mas corta</ItemFilter>
        <ItemFilter>Ordenar</ItemFilter>
        <ItemFilter onClick={() => {return onClickClear()}}>Limpio</ItemFilter>
      </ContainerFilter>
      <SliderAreas
        autoPlayTime={4000}
        duration={'500ms'}
        finalDataAreas={finalDataAreas}
      />
      <ContainerCardProduct grid={grid}>
        <div>
          <ItemFilter>{data.length ? `${data.length} Productos` : 'No hay productos'}</ItemFilter>
          <ItemFilter>{dataFree.length ? `${dataFree.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
        </div>
        {!data?.length ? <SkeletonP /> : data?.map(product => {return (
          <CardProduct grid={grid} key={product.pId} >
            <ButtonCard grid={grid} onClick={() => {return handleDelete(product.pId)}}>
              <IconDelete color={PColor} size={20} />
              <ActionName >
                                Eliminar
              </ActionName>
            </ButtonCard>
            <ButtonCard
              delay='.1s'
              grid={grid}
              top={'80px'}
            >
              <IconEdit color={PColor} size={20} />
              <ActionName>
                                Editar
              </ActionName>
            </ButtonCard>
            <ContentImg grid={grid}>
              {!product.ProImage ? <i>No img</i> : <Img alt={product.ProImage} src={product.ProImage} />}
            </ContentImg>
            <ContentInfo>
              <ContentIconFav grid={grid}>
                <IconLove color={PVColor} size={20} />
              </ContentIconFav>
              {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
              <Title>{product.pName}</Title>
              <Text>{numberFormat(product.ProPrice)}</Text>
              <ContentInfo >
                <Rate
                  onRating={() => {return setRating(product.ProStar)}}
                  rating={product.ProStar}
                  size={20}
                  value={product.ProStar}
                />
                {product.ProDelivery === 1 && <span>Gratis</span>}
              </ContentInfo>
            </ContentInfo>
          </CardProduct>
        )})}
      </ContainerCardProduct>
      <ReadMore onClick={() => {return setShowMore(s => {return s + 5})}}>CARGAR MÁS </ReadMore>
    </ContentProducts>
  </div>
  )
}

Products.propTypes = {
  cities: PropTypes.any,
  color: PropTypes.any,
  countries: PropTypes.any,
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  dataCategories: PropTypes.shape({
    length: PropTypes.any
  }),
  dataFree: PropTypes.shape({
    length: PropTypes.any
  }),
  datafatures: PropTypes.any,
  departments: PropTypes.any,
  dispatch: PropTypes.any,
  features: PropTypes.any,
  finalDataAreas: PropTypes.any,
  handleAddFeature: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeClick: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleDelete: PropTypes.func,
  handleRegister: PropTypes.any,
  intPorcentaje: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onChangeSearch: PropTypes.any,
  onClickClear: PropTypes.func,
  onClickSearch: PropTypes.func,
  rating: PropTypes.any,
  search: PropTypes.any,
  setLocalStorage: PropTypes.func,
  setName: PropTypes.func,
  setRating: PropTypes.func,
  setShowMore: PropTypes.func,
  size: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    Cantidad: PropTypes.any,
    Destacado: PropTypes.any,
    Height: PropTypes.any,
    IstFree: PropTypes.any,
    ProAssurance: PropTypes.any,
    ProDescription: PropTypes.any,
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
        <CardProduct key={i +1}>
          <Skeleton />
        </CardProduct>
      )})}
    </>
  </>
}