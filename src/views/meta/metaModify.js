import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { MetaForm } from './metaForm'
import { useMetas } from '../../hooks'
import { useRef } from 'react'

export const MetaModify = ({ meta }) => {
  const router = useRouter()
  const { create, update, loading } = useMetas()
  const formRef = useRef()

  const saveMeta = async data => {
    if (meta) {
      return await update(meta._id, data)
    } else {
      return await create(data)
    }
  }

  const handleSubmit = async redirect => {
    const submit = formRef.current && formRef.current.props.onSubmit
    const resp = await submit()
    if (redirect && resp.success) {
      router.push('/metas')
    }
  }

  return (
    <>
      <HeaderSection title={`${meta ? 'Editar' : 'Agregar'} Forma de Pago`}>
        <HeaderActions
          path='/metas'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!meta}
          btnName={!meta ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <MetaForm formRef={formRef} save={saveMeta} meta={meta} />
      </Box>
    </>
  )
}
