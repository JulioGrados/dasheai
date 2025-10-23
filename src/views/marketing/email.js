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
import { sendEmail } from '../../redux/email'
import { useStateData } from '../../hooks'

export const MktViewEmail = () => {
  const { data, changeData, cleanData } = useStateData({})
  const emailState = useReduxState('email')
  const fetchEmail = useReduxFetch(sendEmail)

  const handleClick = async () => {
    const formData = new window.FormData()
    if (data.csv) {
      formData.append('file', data.csv.originFileObj)
    }
    fetchEmail(formData)
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      changeData('csv', e[e.length - 1])
      return e[e.length - 1]
    }
    changeData('csv', e.file)
    return e && e.fileList && e.fileList[e.fileList.length - 1]
  }
  console.log('emailState', emailState)
  const columns = getColumns(emailState.send)

  return (
    <>
      <HeaderSection title='Envío masivo email'>
      </HeaderSection>
      <HeaderFlex>
        <span>Agregar el archivo .csv para enviar emails:</span>
        <br></br>
        <Upload
          accept='.csv'
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
        dataSource={emailState.send}
        rowKey='_id'
        bordered
        size='middle'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Email',
    width: 150,
    dataIndex: 'email'
  },
  {
    title: 'Estado',
    width: 150,
    dataIndex: 'success',
    render: success => success ? 'Éxito' : 'Error'
  }
]
