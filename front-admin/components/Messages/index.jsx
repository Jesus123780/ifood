import PropTypes from 'prop-types'
import { useContext } from 'react'
import Image from 'next/image'
import { BoxChat, Chat, CircleStore, ContentAction, ContentMessage, ItemMessage, Message, TextMessage, WrapperChat } from './styled'
import { RippleButton } from 'components/Ripple'
import { IconCancel, IconSendMessageTwo } from 'public/icons'
import { Context } from 'context/Context'

export const MessageComp = ({ data, input, id, messagesEndRef, setStoreChatActive, messageData, er, handleSendMessage, values, handleChange }) => {
  const { selectedStore, hidden, setHidden } = useContext(Context)
  return (
    <div>
      {er && 'Ocurrió un error'}
      <BoxChat>
        {data.map((x, i) => {return <CircleStore key={i + 1} onClick={() => {return setStoreChatActive(x)}}>
          <ItemMessage > {x?.getOneStore?.storeName.slice(0, 2).toUpperCase()}</ItemMessage>
          <Image
            alt={''}
            blurDataURL='/images/DEFAULTBANNER.png'
            className='store_image'
            height={20}
            layout='responsive'
            objectFit='contain'
            src={x.getOneStore.Image || '/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
            width={20}
          />
        </CircleStore>})}
      </BoxChat>
      {<WrapperChat onSubmit={(e) => {return handleSendMessage(e)}} show={hidden}>
        <ContentAction>
          <div className='header-chat' onClick={() => {return setHidden(!hidden)}} >
            <button type='button'>{selectedStore?.getOneStore?.storeName || null}</button>
            <button type='button'><IconCancel size={20} /> </button>
          </div>
          <Chat id='scroll' ref={messagesEndRef}>
            {messageData?.length > 0 && messageData?.map((x, i) => {return (
              <Message key={i + 1}>
                <ContentMessage messageUser={x.from} user={id}>
                  <TextMessage messageUser={x.from} user={id}>
                    {x.content}
                  </TextMessage>
                </ContentMessage>
              </Message>
            )})}

          </Chat>
          <div></div>
          <div className='header-chat'>
            <input
              autoComplete='off'
              errors={values?.content}
              name='content'
              onChange={handleChange}
              placeholder='Aa'
              ref={input}
              type='text'
              value={values?.content}
            />
            <RippleButton
              height='40px'
              padding='0'
              type='submit'
              widthButton='10% '
            ><IconSendMessageTwo color='#000' size='10px' /></RippleButton>
          </div>
        </ContentAction>
      </WrapperChat>}
    </div>
  )
}

MessageComp.propTypes = {
  OneUser: PropTypes.any,
  auth: PropTypes.any,
  data: PropTypes.shape({
    map: PropTypes.func
  }),
  er: PropTypes.string,
  handleChange: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleSendMessage: PropTypes.func,
  id: PropTypes.any,
  input: PropTypes.any,
  loading: PropTypes.any,
  messageData: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  messagesEndRef: PropTypes.any,
  search: PropTypes.any,
  selectedUser: PropTypes.any,
  setShow: PropTypes.any,
  setStoreChatActive: PropTypes.func,
  show: PropTypes.any,
  values: PropTypes.shape({
    content: PropTypes.any
  })
}
