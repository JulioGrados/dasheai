import Link from 'next/link'
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv"
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'

import { useOrders } from '../../hooks'

export const OrdersList = () => {
  const { orders } = useOrders()
  const csvData = orders.map(item => [
    item.statusOrder,
    item.linkedEmail,
    item.linkedFirstName,
    item.linkedLastName,
    item.linkedDNI,
    item.courseId,
    item.courseMoodleId.toString(),
    item.courseName,
    item.agreement,
    item.currency,
    item.amount.toString(),
    item.voucherCode,
    moment(item.voucherDate).add(5, 'hours').format('DD/MM/YYYY'),
    item.voucherBank,
    item.voucherOperation,
    item.assessorUsername,
    item.receiptType,
    moment(item.receiptDate).format('DD/MM/YYYY'),
    item.receiptNames,
    item.receiptDNI,
    item.receiptBusinessName,
    item.receiptRUC,
    item.receiptSerie,
    item.receiptSequential
  ])
  csvData.unshift([
    'Tipo',
    'Email Estudiante',
    'Nombres Estudiante',
    'Apellidos Estudiante',
    'DNI Estudiante',
    'ID Curso',
    'Moodle ID',
    'Curso',
    'Colegio Profesional',
    'Moneda',
    'Monto',
    'Voucher',
    'Fecha Voucher',
    'Banco',
    'N° Operación',
    'Username Asesor Orden',
    'Tipo de Recibo',
    'Fecha de Recibo',
    'Nombres Boleta de Venta',
    'DNI Boleta de Venta',
    'Razón Social',
    'RUC',
    'Serie',
    'Número'
  ])
  console.log('orders', orders)
  const columns = getColumns(orders)
  return (
    <>
      <HeaderSection title='Reportes de Calificaciones'>
        <CSVLink data={csvData}>Download me</CSVLink>
      </HeaderSection>
      <Table
        columns={columns}
        pagination={{ pageSize: 500 }}
        dataSource={orders}
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
    title: 'Fecha de Procesamiento',
    width: 150,
    dataIndex: 'processing',
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.processing) - new Date(b.processing),
    render: processing => moment(processing).format('DD/MM/YYYY')
  },
  {
    title: 'Tipo',
    width: 150,
    dataIndex: 'statusOrder',
    ...SearchRow('statusOrder')
  },
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
    title: 'DNI Estudiante',
    width: 150,
    dataIndex: 'linkedDNI',
    ...SearchRow('linkedDNI')
  },
  {
    title: 'ID Curso',
    width: 150,
    dataIndex: 'courseId',
    ...SearchRow('courseId')
  },
  {
    title: 'Moodle ID',
    width: 150,
    dataIndex: 'courseMoodleId',
    ...SearchRow('courseMoodleId')
  },
  {
    title: 'Curso',
    width: 150,
    dataIndex: 'courseName',
    ...SearchRow('courseName')
  },
  {
    title: 'Colegio Profesional',
    width: 150,
    dataIndex: 'agreement',
    ...SearchRow('agreement')
  },
  {
    title: 'Moneda',
    width: 150,
    dataIndex: 'currency',
    ...SearchRow('currency')
  },
  {
    title: 'Monto',
    width: 150,
    dataIndex: 'amount',
    ...SearchRow('amount')
  },
  {
    title: 'Voucher',
    width: 150,
    dataIndex: 'voucherCode',
    ...SearchRow('voucherCode')
  },
  {
    title: 'Fecha Voucher',
    width: 150,
    dataIndex: 'voucherDate',
    ...SearchRow('voucherDate'),
    render: voucherDate => voucherDate ? moment(voucherDate).add(5, 'hours').format('DD/MM/YYYY') : ''
  },
  {
    title: 'Banco',
    width: 150,
    dataIndex: 'voucherBank',
    ...SearchRow('voucherBank')
  },
  {
    title: 'N° Operación',
    width: 150,
    dataIndex: 'voucherOperation',
    ...SearchRow('voucherOperation')
  },
  {
    title: 'Username Asesor Orden',
    width: 150,
    dataIndex: 'assessorUsername',
    ...SearchRow('assessorUsername')
  },
  {
    title: 'Tipo de Recibo',
    width: 150,
    dataIndex: 'receiptType',
    ...SearchRow('receiptType')
  },
  {
    title: 'Fecha de Recibo',
    width: 150,
    dataIndex: 'receiptDate',
    ...SearchRow('receiptDate'),
    render: receiptDate => receiptDate ? moment(receiptDate).format('DD/MM/YYYY') : ''
  },
  {
    title: 'Nombres Boleta de Venta',
    width: 150,
    dataIndex: 'receiptNames',
    ...SearchRow('receiptNames')
  },
  {
    title: 'DNI Boleta de Venta',
    width: 150,
    dataIndex: 'receiptDNI',
    ...SearchRow('receiptDNI')
  },
  {
    title: 'Razón Social',
    width: 150,
    dataIndex: 'receiptBusinessName',
    ...SearchRow('receiptBusinessName')
  },
  {
    title: 'RUC',
    width: 150,
    dataIndex: 'receiptRUC',
    ...SearchRow('receiptRUC')
  },
  {
    title: 'Serie',
    width: 150,
    dataIndex: 'receiptSerie',
    ...SearchRow('receiptSerie')
  },
  {
    title: 'Número',
    width: 150,
    dataIndex: 'receiptSequential',
    ...SearchRow('receiptSequential')
  },
  {
    title: 'Opciones',
    width: 100,
    dataIndex: 'ref',
    key: 'ref',
    render: ref => <TableOptions id={ref} path='ordenes' />
  }
]
