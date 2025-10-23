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
import { migrateCertificates } from '../../redux/migration'
import { useStateData } from '../../hooks'

export const CertificateUploads = () => {
  const { data, changeData, cleanData } = useStateData({})
  const migrationsState = useReduxState('migration')
  const fetchMigration = useReduxFetch(migrateCertificates)

  const handleClick = async () => {
    const formData = new window.FormData()
    if (data.archives) {
      data.archives.forEach((element, index) => {
        formData.append('file' + index, element.originFileObj)
      })
    }
    fetchMigration(formData)
  }

  const normFile = e => {
    changeData('archives', e.fileList)
    return e[e.fileList.length - 1]
  }
  const columns = getColumns(migrationsState.list)

  return (
    <>
      <HeaderSection title='Migrar Certificados'>
      </HeaderSection>
      <HeaderFlex>
        <span>Agregar un directorio para la migración:</span>
        <br></br>
        <Upload
          name='file'
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          // showUploadList={false}
          onChange={normFile}
          directory
        >
          <Button>
            <Icon type="upload" /> Upload Directory
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
        dataSource={migrationsState.list}
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
