import Column from 'components/common/Atoms/Column'
import Row from 'components/common/Atoms/Row'
import { Context } from 'context/Context'
import { IconHome } from 'public/icons'
import React, { useContext } from 'react'

const Update = () => {
  const { listRoutes } = useContext(Context)

  return (
    <Row flexWrap='wrap' margin='auto' justifyContent={'center'}>
        {listRoutes ? listRoutes.map((route, i) => (
          <Column width={'20%'} display={'flex'} height='100px' border='1px solid' margin='10px' key={i + 1} activeClassName="active" href={`/update/${route.name}` || '/'}>
            <div><IconHome size='15px' />{route.name} </div>
          </Column>
        )) : <div></div>}
    </Row>
  )
}

export default Update