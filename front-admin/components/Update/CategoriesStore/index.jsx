import ReactDOM from 'react-dom'
import { useState } from 'react';
import { Rate } from '../../Rate';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils';
import { RippleButton } from '../../Ripple';
import { Container, FormProducts, CardOne, CardProduct, Card, ColumnCard } from './styled';
import { Skeleton } from '../../Skeleton/SkeletonCard';
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../public/icons';
import { APColor, PColor, PVColor, SEGColor } from '../../../public/colors';
import InputHooks from '../../InputHooks/InputHooks';
import { StatusToggle } from '../../Table';

export const CategoriesStoreComponent = ({ values, handleRegister, handleChange, handleDelete, data, handleToggle }) => {
    const [modal, setModal] = useState(0)
    const handleClickModal = index => {
        setModal(index === modal ? true : index)
    }

    return (<div>
        <Container>
            <CardOne>
                <FormProducts onSubmit={handleRegister}>
                    <InputHooks title='Nombre'
                        type="text"
                        value={values.cName}
                        name='cName'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }}
                    />
                    <InputHooks title='Description'
                        value={values.csDescription}
                        name='csDescription'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <RippleButton widthButton='100%' margin='20px auto' type='submit' bgColor={APColor}>Subir</RippleButton>
                </FormProducts>
            </CardOne>
            <ColumnCard>
                {data.map(x => (
                    <Card height='100px' key={x.catStore}>
                        <div>
                            {x.cName}
                        </div>
                        <div>
                            {x.csDescription}
                        </div>
                        <StatusToggle id={x?.catStore} state={x?.cState === 1} onChange={e => handleToggle(e, x?.catStore)} />
                    </Card>
                ))}
            </ColumnCard>
        </Container>
    </div>
    )
}
export const SkeletonP = () => {
    return <>
        <>
            {[1, 2, 3, 4].map((x, i) => (
                <CardProduct key={i + 1}>
                    <Skeleton />
                </CardProduct>
            ))}
        </>
    </>
}