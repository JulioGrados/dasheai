import Link from 'next/link'
import moment from 'moment'

import { getRatings } from '../../redux/enrol'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../hooks/redux'

import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'

import { useEffect, useState } from 'react'

export const RatingsList = () => {
  const ratingsState = useReduxState('enrol')
  const fetchRatings = useReduxFetch(getRatings)

  useEffect(() => {
    if (ratingsState.general.length === 0) {
      fetchRatings()
    }
  }, [])

  const columns = getColumns(ratingsState.general)
  console.log('ratingsState.general', ratingsState.general)
  return (
    <>
      <HeaderSection title='Reportes de Calificaciones'>
        {/* <Link href='/certificados/agregar'>
          <Button type='primary'>Agregar certificado</Button>
        </Link> */}
      </HeaderSection>
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        dataSource={ratingsState.general}
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
    title: 'Información General',
    children: [
      {
        title: 'Fecha de Procesamiento',
        width: 150,
        dataIndex: 'processing',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.processing) - new Date(b.processing),
        render: processing => moment(processing).format('DD/MM/YYYY')
      },
      {
        title: 'Email',
        width: 150,
        dataIndex: 'linkedEmail',
        ...SearchRow('linkedEmail')
      },
      {
        title: 'Antenombre',
        width: 150,
        dataIndex: 'linkedBeforeName'
      },
      {
        title: 'Nombres',
        width: 150,
        dataIndex: 'linkedFirstName',
        ...SearchRow('linkedFirstName')
      },
      {
        title: 'Apellidos',
        width: 150,
        dataIndex: 'linkedLastName',
        ...SearchRow('linkedLastName')
      },
      {
        title: 'Moodle ID',
        width: 150,
        dataIndex: 'courseMoodleId',
        render: courseMoodleId => courseMoodleId
      },
      {
        title: 'Curso',
        width: 150,
        dataIndex: 'courseName',
        render: courseName => courseName
      }
    ]
  },
  {
    title: 'Información del Certificado',
    children: [
      {
        title: 'Nota Final',
        width: 100,
        dataIndex: 'score',
        render: score => Math.round(score)
      },
      {
        title: 'Código',
        width: 100,
        dataIndex: 'code',
        render: code => code
      },
      {
        title: 'Inicio',
        width: 150,
        dataIndex: 'start',
        render: start => moment(start).format('DD/MM/YYYY')
      },
      {
        title: 'Fin',
        width: 150,
        dataIndex: 'end',
        render: end => moment(end).format('DD/MM/YYYY')
      },
      {
        title: 'Colegio profesional',
        width: 150,
        dataIndex: 'agreement',
        ...SearchRow('agreement')
      },
      {
        title: 'Modalidad',
        width: 150,
        dataIndex: 'modality',
        ...SearchRow('modality')
      }
    ]
  },
  {
    title: 'Datos de Envió',
    children: [
      {
        title: 'Fecha destinatario',
        width: 150,
        dataIndex: 'delivery',
        render: delivery =>
          delivery ? moment(delivery * 1000).format('DD/MM/YYYY') : ''
      },
      {
        title: 'Nombres destinatario',
        width: 150,
        dataIndex: 'shippingFirstName',
        render: shippingFirstName =>
          shippingFirstName || ''
      },
      {
        title: 'Apellidos destinatario',
        width: 150,
        dataIndex: 'shippingLastName',
        render: shippingLastName => (shippingLastName || '')
      },
      {
        title: 'DNI destinatario',
        width: 150,
        dataIndex: 'shippingDni',
        render: shippingDni => (shippingDni || '')
      },
      {
        title: 'Celular destinatario',
        width: 150,
        dataIndex: 'shippingCellPhone',
        render: shippingCellPhone =>
          shippingCellPhone || ''
      },
      {
        title: 'Dirección destinatario',
        width: 150,
        dataIndex: 'shippingAddress',
        render: shippingAddress => (shippingAddress || '')
      }
    ]
  },
  {
    title: 'Modulos',
    children: [
      {
        title: 'Modulo 1',
        width: 100,
        dataIndex: 'mod1',
        render: mod1 => (mod1 || '')
      },
      {
        title: 'Modulo 2',
        width: 100,
        dataIndex: 'mod2',
        render: mod2 => (mod2 || '')
      },
      {
        title: 'Modulo 3',
        width: 100,
        dataIndex: 'mod3',
        render: mod3 => (mod3 || '')
      },
      {
        title: 'Modulo 4',
        width: 100,
        dataIndex: 'mod4',
        render: mod4 => (mod4 || '')
      },
      {
        title: 'Modulo 5',
        width: 100,
        dataIndex: 'mod5',
        render: mod5 => (mod5 || '')
      },
      {
        title: 'Modulo 6',
        width: 100,
        dataIndex: 'mod6',
        render: mod6 => (mod6 || '')
      },
      {
        title: 'Modulo 7',
        width: 100,
        dataIndex: 'mod7',
        render: mod7 => (mod7 || '')
      },
      {
        title: 'Modulo 8',
        width: 100,
        dataIndex: 'mod8',
        render: mod8 => (mod8 || '')
      },
      {
        title: 'Modulo 9',
        width: 100,
        dataIndex: 'mod9',
        render: mod9 => (mod9 || '')
      },
      {
        title: 'Modulo 10',
        width: 100,
        dataIndex: 'mod10',
        render: mod10 => (mod10 || '')
      },
      {
        title: 'Modulo 11',
        width: 100,
        dataIndex: 'mod11',
        render: mod11 => (mod11 || '')
      },
      {
        title: 'Modulo 12',
        width: 100,
        dataIndex: 'mod12',
        render: mod12 => (mod12 || '')
      },
      {
        title: 'Modulo 13',
        width: 100,
        dataIndex: 'mod13',
        render: mod13 => (mod13 || '')
      },
      {
        title: 'Modulo 14',
        width: 100,
        dataIndex: 'mod14',
        render: mod14 => (mod14 || '')
      },
      {
        title: 'Modulo 15',
        width: 100,
        dataIndex: 'mod15',
        render: mod15 => (mod15 || '')
      },
      {
        title: 'Modulo 16',
        width: 100,
        dataIndex: 'mod16',
        render: mod16 => (mod16 || '')
      },
      {
        title: 'Modulo 17',
        width: 100,
        dataIndex: 'mod17',
        render: mod17 => (mod17 || '')
      },
      {
        title: 'Modulo 18',
        width: 100,
        dataIndex: 'mod18',
        render: mod18 => (mod18 || '')
      },
      {
        title: 'Modulo 19',
        width: 100,
        dataIndex: 'mod19',
        render: mod19 => (mod19 || '')
      },
      {
        title: 'Modulo 20',
        width: 100,
        dataIndex: 'mod20',
        render: mod20 => (mod20 || '')
      },
      {
        title: 'Modulo 21',
        width: 100,
        dataIndex: 'mod21',
        render: mod21 => (mod21 || '')
      },
      {
        title: 'Modulo 22',
        width: 100,
        dataIndex: 'mod22',
        render: mod22 => (mod22 || '')
      },
      {
        title: 'Modulo 23',
        width: 100,
        dataIndex: 'mod23',
        render: mod23 => (mod23 || '')
      },
      {
        title: 'Modulo 24',
        width: 100,
        dataIndex: 'mod24',
        render: mod24 => (mod24 || '')
      },
      {
        title: 'Modulo 25',
        width: 100,
        dataIndex: 'mod25',
        render: mod25 => (mod25 || '')
      }
    ]
  },
  {
    title: 'Opciones',
    children: [
      {
        title: 'Opciones',
        width: 100,
        dataIndex: '_id',
        key: '_id',
        render: _id => <TableOptions id={_id} path='certificados' target />
      }
    ]
  }
]
