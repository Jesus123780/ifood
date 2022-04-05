import React from 'react'
import Image from 'next/image';
import { BoxChat, Chat, CircleStore, ContentAction, Message, WrapperChat } from './styled';
import { RippleButton } from 'components/Ripple';
import { IconSendMessage, IconSendMessageTwo } from 'public/icons';

export const MessageComp = ({ data, setSelectedUser, messageData, loading, auth, selectedUser, er, handleSendMessage, values, handleChange, search, handleChangeFilter, OneUser, show, setShow }) => {
    // console.log(first)
    return (
        <div>
            {er && 'Ocurrió un error'}
            <BoxChat className='lol'>
                {[1, 2, 3, 4].map((er, i) => <CircleStore>
                    <Image
                        className='store_image'
                        objectFit='cover'
                        height={30}
                        width={30}
                        layout='responsive'
                        src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                        alt={''}
                        blurDataURL="/images/DEFAULTBANNER.png"
                        placeholder="blur" // Optional blur-up while loading
                    />
                </CircleStore>)}
            </BoxChat>
            {!selectedUser && <WrapperChat onSubmit={handleSendMessage}>
                <ContentAction>
                    <Chat>
                        {messageData?.length > 0 && messageData?.map((x, i) => (
                            <Message key={i + 1}>
                                {x.content}
                            </Message>
                        ))}
                    </Chat>
                    <input type="text"
                        errors={values?.content}
                        value={values?.content}
                        onChange={handleChange}
                        placeholder="Aa"
                        name='content'
                    />
                    <RippleButton type='submit' widthButton='100% ' ><IconSendMessageTwo size='10px' color='#000' /></RippleButton>
                </ContentAction>
            </WrapperChat>}
        </div>
    )
}
