import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ArrowsLabel, ButtonAction, ButtonCode, ButtonNext, ButtonPagination, ButtonPrev, ButtonStatus, CheckBox, CheckBoxLabel, CheckBoxWrapper, ContentItems, ContentTable, ContentTitles, Image, ListActions, Pagination, SectionTitles, Text, WrapperTable } from './styled';
import { BColor, BGColor, SECColor, SEGColor } from '../../public/colors';
import { IconArrowLeft, IconArrowRight, IconDost } from '../../public/icons';

export const CustomTable = props => {
    const [statusToggle, setItemsToggle] = useState(false)
    const [openMenuActions, setOpenMenuActions] = useState(false)
    const handleToggle = (e, uId) => {
        const { id, checked } = e.target
    }
    return (
        <div>
            <ContentTable>
                <TitleTables titles={[
                    { justify: 'center', name: 'Toggle', width: '.5fr' },
                    { justify: 'center', name: 'Franchise Name', width: '1fr' },
                    { justify: 'center', name: 'Status', width: '1fr' },
                    { justify: 'center', name: 'Type', width: '1fr' },
                    { justify: 'center', name: 'SKU', width: '1fr' },
                    { justify: 'center', name: 'Contact', width: '1fr' },
                    { justify: 'center', name: 'Price USD', width: '1fr' },
                    { justify: 'center', name: 'Action', width: '1fr' }
                ]} />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(currentItems => (
                    <WrapperTable columnWidth={['.5fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '.5fr']} key={currentItems._id}>
                        <ContentItems>
                            <StatusToggle id={currentItems?.aId} state={currentItems?.aState !== 3} onChange={e => handleToggle(e, currentItems?.uId)} />
                        </ContentItems>
                        <ContentItems paddingLeft='0'>
                            <Image src={'https://res.cloudinary.com/smart-accounting/image/upload/v1642167965/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_qqdec1.png'} alt='https://res.cloudinary.com/smart-accounting/image/upload/v1642167965/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_qqdec1.png' />
                            <Text margin='auto 20px' size='16px'>Luis Vuitton</Text>
                        </ContentItems>
                        <ContentItems paddingLeft='45px'>
                            <ButtonStatus status={'Active'}>
                                {!currentItems.status === 'Active' ? 'Active' : currentItems?.status === 'Danger' ? 'Active' : 'Pending'}
                            </ButtonStatus>
                        </ContentItems>
                        <ContentItems>
                            <Text paddingLeft='15px' margin='0' size='16px'>Bravo</Text>
                        </ContentItems>
                        <ContentItems>
                            <ButtonCode>
                                9177
                            </ButtonCode>
                        </ContentItems>
                        <ContentItems >
                            <Image radius src={'https://res.cloudinary.com/smart-accounting/image/upload/v1642169312/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_ooujgm.png'} alt='https://res.cloudinary.com/smart-accounting/image/upload/v1642169312/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_ooujgm.png' />
                            <Text margin='auto 20px' size='16px'>Evan flores</Text>
                        </ContentItems>
                        <ContentItems>
                            <Text margin='auto 20px' size='16px'>£ {currentItems.price ? currentItems.price : '452.45'}</Text>
                        </ContentItems>
                        <ContentItems>
                            <ButtonAction onClick={() => setOpenMenuActions(currentItems === openMenuActions ? false : currentItems)}>
                                <IconDost size='30px' color={SECColor} />
                            </ButtonAction>
                            <ListActions openMenuActions={openMenuActions === currentItems}>
                                <ButtonStatus margin='0 0 5px 0' status={'Danger'}>
                                    DELETE
                                </ButtonStatus>
                                <ButtonStatus margin='0 0 5px 0' status={'Active'}>
                                    CHANGE STATUS
                                </ButtonStatus>
                                <ButtonStatus margin='0 0 5px 0' status={''}>
                                    EDIT
                                </ButtonStatus>
                            </ListActions>
                        </ContentItems>
                    </WrapperTable>
                ))}
            </ContentTable>
            <Pagination>
                <ButtonPrev>
                    <IconArrowLeft color={`${BColor}78`} size='20px' />
                </ButtonPrev>
                <ButtonPagination Active={true}>
                    1
                </ButtonPagination>
                /
                <ButtonPagination>
                    16
                </ButtonPagination>
                <ButtonNext>
                    <IconArrowRight color={`${BColor}78`} size='20px' />
                </ButtonNext>
            </Pagination>
        </div>
    )
}

CustomTable.propTypes = {

}
//Status Toggle recibe como props ID
export const StatusToggle = ({ id, state, onChange }) => {
    return (
        <>
            <CheckBoxWrapper>
                <CheckBox id={id} type="checkbox" defaultChecked={!state} onChange={onChange} />
                <CheckBoxLabel htmlFor={id} />
            </CheckBoxWrapper>
        </>
    )
}
export const TitleTables = ({ titles }) => {
    const pTitles = titles
    return (
        <SectionTitles columnWidth={pTitles}>
            {pTitles?.map((x, i) => <ContentTitles justify={x.justify} key={i}>
                <ArrowsLabel htmlFor={x.key}>
                    <Text size={'15px'} margin='0'>{x.name}</Text>
                </ArrowsLabel>
            </ContentTitles>)}
        </SectionTitles>
    )
}