import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { LabelForm } from './labelForm'
import { useLabels } from '../../hooks'
import { useRef } from 'react'

export const LabelModify = ({ label }) => {
  const router = useRouter()
  const { create, update, loading } = useLabels()
  const formRef = useRef()

  const saveLabel = async data => {
    if (label) {
      return await update(label._id, data)
    } else {
      return await create(data)
    }
  }

  const handleSubmit = async redirect => {
    const submit = formRef.current && formRef.current.props.onSubmit
    const resp = await submit()
    if (redirect && resp.success) {
      router.push('/etiquetas')
    }
  }

  return (
    <>
      <HeaderSection title={`${label ? 'Editar' : 'Agregar'} Etiqueta`}>
        <HeaderActions
          path='/etiquetas'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!label}
          btnName={!label ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <LabelForm formRef={formRef} save={saveLabel} label={label} />
      </Box>
    </>
  )
}
