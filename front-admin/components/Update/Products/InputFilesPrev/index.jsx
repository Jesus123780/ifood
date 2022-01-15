import React, { useEffect, useReducer, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { ButtonDelete, DropZone, FileText, Image, ImgCont, InputFile, Button, Preview, Box, Tooltip, PreviewLoader } from './styled'
import { Skeleton } from '../../../Skeleton/SkeletonProducts'
import { SvgUpload } from '../svg'
import { CustomSlider } from '../CustomSlider'
import { IconDelete } from '../../../../public/icons'

export const InputFilesProductos = ({ onChange, reset }) => {
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])
    const [modal, setModal] = useState(false)
    const fileInputRef = useRef(null)
    const onFileInputChange = event => {
        const { files } = event.target
        setImages([...images, ...files])
        onChange([...images, ...files])
        let newFiles = []
        for (let i = 0; i < files.length; i++) newFiles = [...newFiles, files[i]]

        let newFilesPreview = []
        for (let i = 0; i < newFiles.length; i++) {
            newFilesPreview = [
                ...newFilesPreview,
                {
                    temPath: URL.createObjectURL(files[i]),
                    name: files[i]?.name,
                    ext: files[i]?.name?.substring(files[i]?.name?.lastIndexOf('.'), files[i]?.name?.length)
                }
            ]
        }
        setPreviewImg([
            ...previewImg,
            ...newFilesPreview
        ])
    }

    useEffect(() => {
        if (reset) {
            setImages([])
            setPreviewImg([])
        }
    }, [])

    const handleDelete = (e, item, index) => {
        e.stopPropagation()
        const newImages = images.filter((x, i) => (x.name !== item.name && i !== index))
        const previewNewImages = previewImg.filter((x, i) => (x.temPath !== item.temPath && i !== index))
        setImages(newImages)
        setPreviewImg(previewNewImages)
    }
    function reducer(state, action) {
        switch (action?.type) {
        case 'NEXT':
            return {
                ...state,
                currentIndex: state?.currentIndex + (1 % state?.data?.length),

            };
        case 'PREV':
            return {
                ...state,
                currentIndex: state?.currentIndex - (1 % state?.data?.length)
            };
        case 'GOTO':
            return {
                ...state,
                currentIndex: action?.index
            };
        case 'RESET':
            return { ...state, currentIndex: 0, currentPosition: 0, };

        default:
            return { state };
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        currentIndex: 0,
        data: [
            { id: 1, name: 'Slide 5', image: images[0] },
            { id: 2, name: 'Slide 5', image: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1624555002140-home-sliderdesktop2x.jpg' },
            { id: 3, name: 'Slide 5', image: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1624555002140-home-sliderdesktop2x.jpg' },
            { id: 4, name: 'Slide 5', image: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1624555002140-home-sliderdesktop2x.jpg' },
        ]
    }
    );
    return (
        <>
            <Box>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <PreviewLoader>
                        {!previewImg?.length && [1, 2, 3].map(x => (
                            <Skeleton key={x?.id} />
                        ))}
                    </PreviewLoader>
                    {!previewImg?.length && <Skeleton />}
                </div>
                <DropZone>
                    {!previewImg?.length && (<>
                        <Button onClick={e => {
                            e.stopPropagation()
                            document.getElementById('dropZone').click()
                        }} >
                            <SvgUpload />
                        </Button>
                    </>

                    )}
                    <Preview onClick={e => {
                        e.stopPropagation()
                        document.getElementById('dropZone').click()
                    }} previewImg={previewImg}>
                        {!!previewImg?.length && previewImg?.map((x, i) => (
                            <div key={i}>
                                <ImgCont title={x.name}>
                                    <ButtonDelete onClick={e => handleDelete(e, x, i)}>
                                        <Tooltip><IconDelete size='20px' /></Tooltip>
                                    </ButtonDelete>
                                    {(x.ext === '.png' || x.ext === '.svg' || x.ext === '.jpg' || x.ext === '.jpeg') ?
                                        <Image src={x?.temPath} />
                                        : (x.ext === '.docx' || x.ext === '.docm' || x.ext === '.dotx' || x.ext === '.dotm') ?
                                            <i>DocWord</i>
                                            : (x.ext === '.xlsx' || x.ext === '.xlsm' || x.ext === '.xlsb' || x.ext === '.xltx' || x.ext === '.xls') ?
                                                <i>Execl</i>
                                                : <i>FILE COMUN</i>
                                    }
                                    <FileText>{x.name}</FileText>
                                </ImgCont>
                            </div>
                        ))}
                    </Preview>
                    {!!previewImg?.length && (
                        <div style={{ marginLeft: '40px' }}>
                            <Image src={previewImg[0]?.temPath} />
                        </div>
                    )}
                    <InputFile
                        id="dropZone"
                        onChange={onFileInputChange}
                        ref={fileInputRef}
                        type="file"
                        multiple
                    />
                </DropZone>
            </Box>
            { !!previewImg?.length === null && <CustomSlider state={state} state={previewImg} setModal={setModal} modal={modal} autoPlayTime={4000} duration={'500ms'} dispatch={dispatch} /> }

        </>
    )
}

InputFilesProductos.propTypes = {
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.bool
}