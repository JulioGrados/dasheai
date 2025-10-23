import Link from 'next/link'
import moment from 'moment'

import { HeaderSection, Table, TableOptions, SearchRow } from 'components-path'
import { Button } from 'antd'
import { FilterRow } from '../../../components'

export const TimetableList = ({ timetables, loading, loaded, handleDelete }) => {
  const columns = [
    {
      title: 'Fecha',
      width: 150,
      dataIndex: 'fullDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.fullDate) - new Date(b.fullDate),
      render: fullDate => moment(fullDate).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Asesor',
      dataIndex: 'assignedName',
      key: 'assignedName',
      ...SearchRow('assignedName', 'Buscar asesor.')
    },
    {
      title: 'Etapa',
      dataIndex: 'stage',
      key: 'stage',
      ...FilterRow('stage', timetables)
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='timetables'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este horario?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de horarios'>
        <Link href='/timetables/agregar'>
          <Button type='primary'>Agregar horario</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={timetables}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
