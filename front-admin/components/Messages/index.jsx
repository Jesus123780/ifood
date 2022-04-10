import { useContext } from 'react'
import Image from 'next/image';
import { BoxChat, Chat, CircleStore, ContentAction, ContentMessage, ItemMessage, Message, TextMessage, WrapperChat } from './styled';
import { RippleButton } from 'components/Ripple';
import { IconCancel, IconSendMessage, IconSendMessageTwo } from 'public/icons';
import { Context } from 'context/Context';
// import { Context } from '../../context/index';

export const MessageComp = ({ data, input, id, messagesEndRef, setStoreChatActive, messageData, loading, auth, selectedUser, er, handleSendMessage, values, handleChange, search, handleChangeFilter, OneUser, show, setShow }) => {
    const { setAlertBox, selectedStore, hidden, setHidden } = useContext(Context)
    return (
        <div>
            {er && 'Ocurrió un error'}
            <BoxChat>
                {data.map((x, i) => <CircleStore key={i + 1} onClick={() => setStoreChatActive(x)}>
                    <ItemMessage > {x?.getOneStore?.storeName.slice(0, 2).toUpperCase()}</ItemMessage>
                    <Image
                        className='store_image'
                        objectFit='contain'
                        height={20}
                        width={20}
                        layout='responsive'
                        src={x.getOneStore.Image || '/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                        alt={''}
                        blurDataURL="/images/DEFAULTBANNER.png"
                    />
                </CircleStore>)}
            </BoxChat>
            {<WrapperChat show={hidden} onSubmit={(e) => handleSendMessage(e)}>
                <ContentAction>
                    <div className='header-chat' onClick={() => setHidden(!hidden)} >
                        <button type='button'>{selectedStore?.getOneStore?.storeName || null}</button>
                        <button type='button'><IconCancel size={20} /> </button>
                    </div>
                    <Chat id='scroll'  ref={messagesEndRef}>
                        {messageData?.length > 0 && messageData?.map((x, i) => (
                            <Message key={i + 1}>
                                <ContentMessage user={id} messageUser={x.from}>
                                    <TextMessage user={id} messageUser={x.from}>
                                        {x.content}
                                    </TextMessage>
                                </ContentMessage>
                            </Message>
                        ))}

                    </Chat>
                    <div></div>
                    <div className='header-chat'>
                        <input type="text"
                            ref={input}
                            errors={values?.content}
                            value={values?.content}
                            autoComplete='off'
                            onChange={handleChange}
                            placeholder="Aa"
                            name='content'
                        />
                        <RippleButton type='submit' widthButton='10% ' padding='0' height='40px'><IconSendMessageTwo size='10px' color='#000' /></RippleButton>
                    </div>
                </ContentAction>
            </WrapperChat>}
        </div>
    )
}
