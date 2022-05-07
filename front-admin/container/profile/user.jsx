import React, { useState, Fragment, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ArrowsLabel, ButtonAction, ButtonCode, ButtonNext, ButtonPagination, ButtonPrev, ButtonStatus, CheckBox, CheckBoxLabel, CheckBoxWrapper, ContentItems, ContentTable, ContentTitles, Image, ListActions, Pagination, SectionTitles, Text, WrapperTable } from './styled'
import { BColor, BGColor, SECColor, SEGColor } from '../../public/colors'
import { IconArrowLeft, IconArrowRight, IconDost } from '../../public/icons'
import UserProfileSettings from '../../components/UserProfile'
import { useFormTools } from '../../components/BaseForm'
import { GET_ALL_DEVICES, GET_USER_PROFILE, SET_USER_PROFILE } from './queries'
import { filterKeyObject, updateCacheMod } from '../../utils'
import { GET_USER } from '../../gql/LoginAut'
import { Loading } from '../../components/Loading'

export const UserProfile = props => {
  const [handleChange, handleSubmit, handleForcedData, { dataForm }] = useFormTools()
  const { data, loading, error } = useQuery(GET_USER)
  const { data: dataDevice } = useQuery(GET_ALL_DEVICES)
  const { data: dataUp } = useQuery(GET_USER_PROFILE)
  const { getOneUserProfile } = dataUp || {}
  const [setUserProfile, { loading: loadUP }] = useMutation(SET_USER_PROFILE)
  useEffect(() => {
    let obj = { ...getOneUserProfile, ...data?.getUser }
    handleForcedData({ ...obj })
  }, [data, dataUp])
  const handleForm = e => {return handleSubmit({
    event: e,
    action: () => {return setUserProfile({
      variables: {
        data: {
          ...filterKeyObject(dataForm, ['__typename', 'id', 'name', 'lastName', 'email', 'getUser', 'username', 'ULocation', 'avatar', 'createAt', 'description', 'password', 'role', 'siteWeb', 'uPhoNum', 'uState', 'uToken', 'upIdeDoc', 'upLat', 'upLon']),
          upImage: 'lol',
          user: {
            id: dataForm.id,
            username: dataForm.username,
            lastName: dataForm.lastName,
            name: dataForm.name,
            uAvatar: dataForm.uAvatar,
            email: dataForm.email
          }
        }
      }
    })}
  })}
  return (
    <>
      {loading && <Loading />}
      <UserProfileSettings
        dataDevice={dataDevice?.getDeviceUsers}
        dataForm={dataForm}
        handleSubmit={handleForm}
        onChange={handleChange}
      />
    </>
  )
}