import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { gql, useQuery, useMutation } from '@apollo/client'
import { RippleButton } from '../../../components/Ripple';
import { BGColor, EColor, PColor, PLColor, PVColor } from '../../../public/colors';
import { IconDelete, IconPlus } from '../../../public/icons';
import { numberFormat } from '../../../utils';
import { UPDATE_MULTI_EXTRAS_PRODUCT_FOOD } from '../../update/Products/queries';

export const ExtrasProductsItems = ({ pId }) => {
    //    STATES
    console.log(pId);
    const initialLine = {
        extraName: '',
        extraPrice: '',
        exState: false,
    }
    const initialLineItems = {
        Lines: [
            {
                extraName: '',
                extraPrice: '',
                exState: false,
            },
            (initialLine)
        ],
    }
    const CleanLines = useCallback(() => {
        setLine(initialLineItems)
    }, [initialLineItems])
    //    QUERIES
    const [updateMultipleExtProductFoods, { loading, data, error }] = useMutation(UPDATE_MULTI_EXTRAS_PRODUCT_FOOD, {
        onCompleted: () => {
            CleanLines()
        }
    })

    // HANDLESS
    const [LineItems, setLine] = useState(initialLineItems)
    const handleAdd = () => {
        const Lines = [...LineItems?.Lines, { ...initialLine }, { ...initialLine }]
        setLine({ ...LineItems, Lines })
    }
    console.log(LineItems.Lines);
    const handleLineChange = useCallback((index, name, value) => {
        const Lines = LineItems.Lines.map((salesLine, i) => {
            if (i === index) {
                const newLine = { ...salesLine }
                if (name === 'extraName' && 'extraPrice') {
                    newLine[name] = value

                } else if (name === 'exState') {
                    const { checked } = value.target
                    newLine[name] = checked
                } else {
                    newLine[name] = value
                }
                return newLine
            }
            return { ...salesLine }
        })
        setLine({ ...LineItems, Lines })
    }, [LineItems])
    const handleRemove = i => {
        const Lines = LineItems?.Lines?.filter((salesLine, index) => index !== i)
        setLine({ ...LineItems, Lines })
    }
    const dataArr = LineItems?.Lines?.map(x => { return { extraPrice: parseFloat(x.extraPrice), exState: x.exState === true ? 1 : 0, extraName: x.extraName, pId: pId } })
    const onSubmitUpdate = async e => {
        e.preventDefault()
        try {
            await updateMultipleExtProductFoods({
                variables: {
                    inputLineItems: {
                        setData: dataArr || []
                    }
                }
            }).then(res => console.log(res))
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Container>
            <form onSubmit={(e) => onSubmitUpdate(e)} >
                {LineItems && LineItems?.Lines?.map((salesLine, i) => (
                    <ContentLinesItems key={salesLine._id}>
                        <div style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <InputHooks
                                inputText
                                inputText
                                margin='10px 0'
                                placeholder='Extra products'
                                value={salesLine.extraName}
                                onChange={value => handleLineChange(i, 'extraName', value)}
                            />
                            <ContentLinesItems>
                                <span><IconPlus size="10px" color={PColor} /></span>
                                <InputHooks
                                    inputText
                                    color={EColor}
                                    inputText
                                    margin='10px 0'
                                    placeholder='Precio'
                                    value={numberFormat(salesLine.extraPrice)}
                                    onChange={value => handleLineChange(i, 'extraPrice', value)}
                                />

                            </ContentLinesItems>
                        </div>
                        <ContentCheckbox>
                            <Input
                                checkbox
                                type='checkbox'
                                margin='10px 0'
                                // value={salesLine.exState}
                                onChange={value => handleLineChange(i, 'exState', value)}
                            />
                        </ContentCheckbox>
                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemove(i)} >
                            <IconDelete size='25px' color={EColor} />
                        </RippleButton>
                    </ContentLinesItems>
                ))}
                <RippleButton margin='0px' widthButton='min-content' type="submit">
                    Update
                </RippleButton>
            </form>
            <Action>
                <RippleButton bgColor={'transparent'} margin='0px' widthButton='240px' type="button" onClick={() => CleanLines()} >
                    <IconDelete size='25px' color={EColor} />
                </RippleButton>
                <RippleButton margin='0px' widthButton='240px' type="button" onClick={() => handleAdd()} >
                    <IconPlus size='25px' color={EColor} />
                </RippleButton>
            </Action>
        </Container>);
};

const ContentLinesItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    max-height: 100%;
    height: 100%;
`
const ContentCheckbox = styled.div`
    transition: all .1s;
    color: inherit;
    cursor: pointer;
    outline: none;
    position: relative;
    margin-right: 2px;
`
const Input = styled.input`
    ${props => props.inputText && css`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => color};
        outline: none;
        padding: 5px;
        border: 1px solid transparent;
    `}
    ${props => props.checkbox && css`
        cursor: inherit;
        zoom: inherit;
        margin: 0;
        z-index: 2;
    `}
    &:focus {
        border: 1px solid ${PVColor};
    }
    &&::after {
        border-width: 6px;
        visibility: visible;
        border: 1 solid #ea1d2c;
        border: 1 solid #ea1d2c;
        background: transparent;
        z-index: 1;
        transition: .15s cubic-bezier(.25,.46,.45,.94);
        visibility: hidden;
        background: transparent;
        z-index: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: transparent;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 50%;
    }
`
const Container = styled.div`
    padding: 20px;
    overflow: auto;
    @media only screen and (max-width: 768px) {
        display: none;
        padding: 0;
    }
`
const Action = styled.div`
    font-size: 16px;
    background: ${BGColor};
    border-top: 2px solid #f5f0eb;
    justify-content: flex-end;
    padding: 20px;
    height: 80px;
    align-items: center;
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 50%;
`
export const Checkbox = ({ name, checkAll, defaultChecked, onCheck }) => {
    const [checked, setChecked] = useState(defaultChecked);
    const handleCheck = useCallback(
        (name) => {
            setChecked(!checked);
            onCheck(name);
        },
        [checked, onCheck]
    );

    useEffect(() => {
        if (checkAll) {
            setChecked(true);
        }

        if (!checkAll && defaultChecked) {
            setChecked(true);
        }

        if (!defaultChecked && checkAll) {
            setChecked(true);
        }

        if (!defaultChecked && !checkAll) {
            setChecked(false);
        }
    }, [checkAll, defaultChecked]);

    return (
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => handleCheck(name)}
        />
    );
};

export const InputHooks = ({ placeholder, value, onChange, inputText, type, color }) => {
    return (
        <>
            <Input
                type={type || "text"}
                inputText={inputText}
                color={color}
                placeholder={placeholder || ''}
                value={value || ''}
                onChange={onChange ? e => onChange(e.target.value) : undefined}
            />
        </>
    )
}