import Link from 'next/link'
import { Button } from 'antd'
import { HeaderSection, Table, TableOptions, SearchRow } from '../../components'
import { useCompanies } from '../../hooks'

export const CompanyList = () => {
  const { companies, loading, remove, loaded } = useCompanies()
  const columns = getColumns(remove)

  console.log(companies)

  return (
    <>
      <HeaderSection title='Lista de empresas'>
        <Link href='/empresas/agregar'>
          <Button type='primary'>Agregar empresa</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={companies}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = handleDelete => [
  {
    title: 'Nombre',
    dataIndex: 'name',
    ...SearchRow('name', 'Buscar por nombre')
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    ...SearchRow('slug', 'Buscar por slug.')
  },
  {
    title: 'RUC',
    dataIndex: 'ruc',
    ...SearchRow('ruc', 'Buscar por RUC.')
  },
  {
    title: 'Razón Social',
    dataIndex: 'businessName',
    ...SearchRow('businessName', 'Buscar por razón social.')
  },
  {
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    render: _id => (
      <TableOptions
        id={_id}
        path='empresas'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar esta empresa?'
      />
    )
  }
]
