import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { DealForm } from './dealForm'
import { useDeals } from '../../hooks'
import { useRef } from 'react'

export const DealModify = ({ deal }) => {
  const router = useRouter()
  const { create, update } = useDeals()
  const formRef = useRef()

  const saveDeal = async data => {
    if (deal) {
      return await update(deal._id, data)
    } else {
      return await create(data)
    }
  }

  const handleSubmit = async redirect => {
    const submit = formRef.current && formRef.current.props.onSubmit
    const resp = await submit()
    if (redirect && resp.success) {
      router.push('/tratos')
    }
  }

  return (
    <>
      <HeaderSection title={`${deal ? 'Editar' : 'Agregar'} trato`}>
        <HeaderActions
          path='/tratos'
          handleSubmit={handleSubmit}
          isSaveClean={!deal}
          btnName={!deal ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <DealForm formRef={formRef} save={saveDeal} deal={deal} />
      </Box>
    </>
  )
}
