import Link from 'next/link'
import { Button } from 'antd'
import moment from 'moment'

import {
  Table,
  SearchRow,
  FilterRow,
  TableOptions,
  HeaderSection
} from 'components-path'

export const CourseList = ({ list, loading, loaded, handleDelete }) => {
  // console.log('list', list)
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      width: 150,
      ...SearchRow('name')
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      width: 150,
      ...SearchRow('slug')
    },
    {
      width: 150,
      title: 'Nombre corto',
      dataIndex: 'shortName',
      ...SearchRow('shortName')
    },
    {
      width: 150,
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      width: 150,
      title: 'Moodle ID',
      dataIndex: 'moodleId',
      key: 'moodleId',
      ...SearchRow('moodleId', 'Buscar por Moodle ID.')
    },
    {
      width: 150,
      title: 'Publicado',
      dataIndex: 'published',
      key: 'published',
      sorter: (a, b) => moment(a.published).isSameOrAfter(moment(b.published)),
      render: published => moment(published).format('ll')
    },
    {
      width: 150,
      title: 'Categoría',
      dataIndex: 'categoryName',
      ...FilterRow('categoryName', list)
    },
    {
      width: 150,
      title: 'Convenio',
      dataIndex: 'agreementName',
      ...FilterRow('agreementName', list)
    },
    {
      width: 150,
      title: 'Oculto',
      dataIndex: 'isHidden',
      ...FilterRow('isHidden', list)
    },
    {
      width: 150,
      title: 'Brochure',
      dataIndex: 'brochure',
      ...FilterRow('brochure', list)
    },
    {
      width: 150,
      title: 'Opengraph',
      dataIndex: 'opengraph',
      ...FilterRow('opengraph', list)
    },
    {
      width: 150,
      title: 'Foro',
      dataIndex: 'isForo',
      ...FilterRow('isForo', list)
    },
    {
      width: 150,
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...SearchRow('id', 'Buscar por ID.')
    },
    {
      width: 150,
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      fixed: 'right',
      render: _id => (
        <TableOptions
          id={_id}
          path='cursos'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este curso?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Cursos'>
        <Link href='/cursos/agregar'>
          <Button type='primary'>Agregar Curso</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={list}
        scroll={{ x: 800 }}
        pagination={{ pageSize: 100 }}
        bordered
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
