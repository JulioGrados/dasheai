
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow
} from '../../components'
import { useEffect } from 'react'
import { useReduxFetch, useReduxState } from '../../hooks/redux'
import { getGeneral } from '../../redux/enrol'
import { payloadToGeneralData } from 'utils/functions/enrol'

export const EnrolsGeneralList = () => {
  const enrolsState = useReduxState('enrol')
  const fetchRatings = useReduxFetch(getGeneral)

  useEffect(() => {
    if (enrolsState.all.length === 0) {
      fetchRatings()
    }
  }, [])
  const enrols = enrolsState.all.length ? enrolsState.all.map(item => payloadToGeneralData(item)) : []
  
  const columns = getColumns(enrols)
  return (
    <>
      <HeaderSection title='Listado General de Matriculas'>
        {/* <Link href='/certificados/agregar'>
          <Button type='primary'>Agregar certificado</Button>
        </Link> */}
      </HeaderSection>
      <Table
        columns={columns}
        pagination={{ pageSize: 500 }}
        dataSource={enrols}
        scroll={{ x: 800 }}
        rowKey='_id'
        bordered
        size='middle'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Email Estudiante',
    width: 150,
    dataIndex: 'linkedEmail',
    ...SearchRow('linkedEmail')
  },
  {
    title: 'Nombres Estudiante',
    width: 150,
    dataIndex: 'linkedFirstName',
    ...SearchRow('linkedFirstName')
  },
  {
    title: 'Apellidos Estudiante',
    width: 150,
    dataIndex: 'linkedLastName',
    ...SearchRow('linkedLastName')
  },
  {
    title: 'Celular Estudiante',
    width: 150,
    dataIndex: 'linkedMobile',
    ...SearchRow('linkedMobile')
  },
  {
    title: 'Curso',
    width: 150,
    dataIndex: 'courseName',
    ...SearchRow('courseName')
  },
  {
    title: 'Enlace',
    width: 150,
    dataIndex: 'linkedLinkEmail',
    render: linkedLinkEmail => <a href={'https://crm.eai.edu.pe/search/general?emailLead=' + linkedLinkEmail} target='_blank'>Enlace</a>
  },
  {
    title: 'Opciones',
    width: 100,
    dataIndex: '_id',
    key: '_id',
    render: _id => <TableOptions id={_id} path='matriculas' />
  }
]
