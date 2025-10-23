import Link from 'next/link'
import moment from 'moment'
import { HeaderSection, Table, TableOptions, SearchRow, FilterRow } from 'components-path'
import { Button } from 'antd'

export const VoucherList = ({ vouchers, loading, loaded, handleDelete }) => {
  // console.log(vouchers)
  const columns = [
    {
      title: 'Fecha',
      width: 200,
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).diff(moment(b.date)),
      render: date => moment(date).add(5, 'hours').format('DD/MM/YYYY')
    },
    {
      title: 'Código',
      width: 200,
      dataIndex: 'code',
      key: 'code',
      ...SearchRow('code')
    },
    {
      title: 'Monto',
      width: 200,
      dataIndex: 'amount',
      key: 'amount',
      ...SearchRow('amount')
    },
    {
      title: 'Residuo',
      width: 200,
      dataIndex: 'residue',
      key: 'residue',
      ...SearchRow('residue')
    },
    {
      title: 'Validación',
      width: 200,
      dataIndex: 'valid',
      key: 'valid',
      ...FilterRow('valid', vouchers)
    },
    {
      title: 'Moneda',
      width: 200,
      dataIndex: 'currency',
      key: 'currency',
      ...SearchRow('currency')
    },
    {
      title: 'Número de operación',
      width: 200,
      dataIndex: 'operationNumber',
      key: 'operationNumber',
      ...SearchRow('operationNumber')
    },
    {
      title: 'Anulada',
      width: 200,
      width: 150,
      dataIndex: 'annular',
      key: 'annular',
      render: (annular) => annular ? 'Sí' : 'No',
    },
    {
      title: 'Asignado',
      width: 200,
      dataIndex: 'assignedName',
      key: 'assignedName',
      ...SearchRow('assignedName')
    },
    {
      title: 'Banco',
      width: 200,
      dataIndex: 'bankName',
      key: 'bankName',
      ...FilterRow('bankName', vouchers)
    },
    {
      title: 'Opciones',
      width: 100,
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='vouchers'
          // onDelete={handleDelete}
          confirm='Estas seguro de eliminar este voucher?'
          target
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de vouchers'>
        <Link href='/vouchers/agregar'>
          <Button type='primary'>Agregar voucher</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={vouchers}
        loading={!loaded && loading}
        scroll={{ x: 800 }}
        rowKey='_id'
      />
    </>
  )
}
