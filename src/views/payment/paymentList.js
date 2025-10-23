import Link from 'next/link'
import { Button } from 'antd'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'
import { usePayments } from '../../hooks'

export const PaymentList = () => {
  const { payments, loading, remove, loaded } = usePayments()
  const columns = getColumns(payments, remove)

  return (
    <>
      <HeaderSection title='Lista de Metodo de pagos'>
        <Link href='/pagos/agregar'>
          <Button type='primary'>Agregar Metodo de pago</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={payments}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Tipo',
    dataIndex: 'type',
    ...FilterRow('type', list)
  },
  {
    title: 'amount',
    dataIndex: 'amount',
    ...SearchRow('amount')
  },
  {
    title: 'Url',
    dataIndex: 'url',
    ...SearchRow('url')
  },
  {
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    render: _id => (
      <TableOptions
        id={_id}
        path='pagos'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar este metodo de pago?'
      />
    )
  }
]
