import React from 'react'
import { IconArrowLeft, IconCSS, IconExcel, IconHTML, IconImg, IconJS, IconPDF, IconSvg, IconTar, IconWord, IconZIP } from '../../public/icons'
import { RandomCode } from '../../utils'

export const MockData = {
    lists: {
        '01list': {
            id:  RandomCode (9),
            title: 'Elige tu salsa favorita',
            numberLimit: 0,
            required: 0,
            cards: [
            ]
        },
    },
    listIds: ['01list']
}
