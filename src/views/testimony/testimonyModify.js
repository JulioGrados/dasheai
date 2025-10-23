import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { TestimonyForm } from './testimonyForm'
import { useTestimony } from '../../hooks'
import { useRef } from 'react'

export const TestimonyModify = ({ testimony }) => {
  const router = useRouter()
  const { create, update, loading } = useTestimony()
  const formRef = useRef()

  const saveTestimony = async data => {
    if (testimony) {
      return await update(testimony._id, data)
    } else {
      return await create(data)
    }
  }

  const handleSubmit = async redirect => {
    const submit = formRef.current && formRef.current.props.onSubmit
    const resp = await submit()
    if (redirect && resp.success) {
      router.push('/testimonios')
    }
  }

  return (
    <>
      <HeaderSection title={`${testimony ? 'Editar' : 'Agregar'} Etiqueta`}>
        <HeaderActions
          path='/testimonios'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!testimony}
          btnName={!testimony ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <TestimonyForm
          formRef={formRef}
          save={saveTestimony}
          testimony={testimony && testimony}
        />
      </Box>
    </>
  )
}
