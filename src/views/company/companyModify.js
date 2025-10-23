import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { CompanyForm } from './companyForm'
import { useCompanies } from '../../hooks'
import { useRef } from 'react'

export const CompanyModify = ({ company }) => {
  const router = useRouter()
  const { create, update, loading } = useCompanies()
  const formRef = useRef()

  const saveCompany = async data => {
    if (company) {
      return await update(company._id, data)
    } else {
      return await create(data)
    }
  }

  const handleSubmit = async redirect => {
    const submit = formRef.current && formRef.current.props.onSubmit
    const resp = await submit()
    if (redirect && resp.success) {
      router.push('/empresas')
    }
  }

  return (
    <>
      <HeaderSection title={`${company ? 'Editar' : 'Agregar'} empresa`}>
        <HeaderActions
          path='/empresas'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!company}
          btnName={!company ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <CompanyForm formRef={formRef} save={saveCompany} company={company} />
      </Box>
    </>
  )
}
