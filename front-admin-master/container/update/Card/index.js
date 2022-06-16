import { useQuery, useMutation } from '@apollo/client'
import { DELETE_CARDS_TYPES, GET_ALL_CARDS_TYPES, REGISTER_CARDS_TYPES } from 'gql/Admin/cardTypes'
import InputHooks from 'components/InputHooks/InputHooks'
import { useFormTools } from 'components/BaseForm'
import { Button, Column, Row } from 'components/common/Atoms'
import { RippleButton } from 'components/Ripple'
import { IconDelete } from 'public/icons'
import { PColor } from 'public/colors'

export const Card = () => {
  // STATE
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  // QUERIES
  const { data } = useQuery(GET_ALL_CARDS_TYPES, {
    context: { clientName: "admin-store" }

  })
  const [registerPaymentCardType] = useMutation(REGISTER_CARDS_TYPES, {
    context: { clientName: "admin-store" }
  })
  const [deletePaymentCardType] = useMutation(DELETE_CARDS_TYPES, {
    context: { clientName: "admin-store" }
  })

  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        if (!dataForm.typeCardName) {
          setForcedError({ ...errorForm, typeCardName: true })
        }
        return registerPaymentCardType({
          variables: {
            input: {
              ...dataForm,
            }
          }, update(cache) {
            cache.modify({
              fields: {
                getAllPaymentCardType(dataOld = []) {
                  return cache.writeQuery({ query: GET_ALL_CARDS_TYPES, data: dataOld })
                }
              }
            })
          }
        }).then(() => {
          setDataValue({})
        })
      }
    })
  }
  const handleDeletePaymentCardType = (cardtypeId) => {
    try {
      deletePaymentCardType({
        variables: {
          cardtypeId: cardtypeId
        }, update(cache) {
          cache.modify({
            fields: {
              getAllPaymentCardType(dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_CARDS_TYPES, data: dataOld })
              }
            }
          })
        }
      }).catch(() => {

      })
    } catch (error) {

    }
  }
  return (
    <Column padding='10px' margin='auto'>
      <Row>
        {data?.getAllPaymentCardType?.map((type) => (
          <Column
            borderRadius={'10px'}
            height='208px'
            width='335px'
            boxShadow='0 4px 8px 0 rgb(0 0 0 / 20%)'
            border='1px solid #eee'
            margin='10px'
            padding='20px'
            display='grid'
            alignContent='stretch'
            alignItems='stretch'
            key={type.cardtypeId}>
            {type.typeCardName}
            <Button cursor='pointer' background='transparent' onClick={() => handleDeletePaymentCardType(type.cardtypeId)}>
              <IconDelete color={PColor} size={20} />
            </Button>
          </Column>
        ))}
      </Row>
      <Column as='form' padding='20px' width='50%' display='flex' onSubmit={(e) => { return handleForm(e) }}>
        <InputHooks
          title='typeCardName'
          required
          errors={dataForm?.typeCardName}
          value={dataForm?.typeCardName}
          onChange={handleChange}
          name='typeCardName'
        />
        <RippleButton type={'submit'} widthButton='min-content'>Guardar</RippleButton>
      </Column>
    </Column>
  )
}
