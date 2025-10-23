import Link from 'next/link'
import moment from 'moment'
import { Upload, Icon, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'

import { HeaderFlex } from './styles/styles'
import { useReduxFetch, useReduxState } from '../../hooks/redux'
import { migrateSales } from '../../redux/migration'
import { useStateData } from '../../hooks'

export const SaleUploads = () => {
  const { data, changeData, cleanData } = useStateData({})
  const migrationsState = useReduxState('migration')
  const fetchMigration = useReduxFetch(migrateSales)

  const handleClick = async () => {
    const formData = new window.FormData()
    if (data.csv) {
      formData.append('file', data.csv.originFileObj)
    }
    fetchMigration(formData)
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      changeData('csv', e[e.length - 1])
      return e[e.length - 1]
    }
    changeData('csv', e.file)
    return e && e.fileList && e.fileList[e.fileList.length - 1]
  }
  console.log('migrationsState', migrationsState)
  const columns = getColumns(migrationsState.sales)

  return (
    <>
      <HeaderSection title='Migrar Ventas'>
      </HeaderSection>
      <HeaderFlex>
        <span>Agregar el archivo .csv para migración:</span>
        <br></br>
        <Upload
          accept='.txt, .csv'
          name='file'
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          // showUploadList={false}
          onChange={normFile}
        >
          <Button>
            <Icon type="upload" /> Upload CSV
          </Button>
        </Upload>
        <br></br>
        <Button type="primary" onClick={handleClick}>
          Migrar
        </Button>
      </HeaderFlex>
      <br></br>
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        dataSource={migrationsState.sales}
        rowKey='_id'
        bordered
        size='middle'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Código del certificado',
    width: 150,
    dataIndex: 'code'
  },
  {
    title: 'Estado',
    width: 150,
    dataIndex: 'success',
    render: success => success ? 'Éxito' : 'Error'
  }
]
