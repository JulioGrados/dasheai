import { Form, Alert, Input, Button } from 'antd'
import { Box, HeaderSection } from '../../components'
import { useDeals, useStateData } from '../../hooks'
import { useState } from 'react'
const { TextArea } = Input

export const DealClient = () => {
  const [error, setError] = useState()
  const [result, setResult] = useState()
  const { data, changeData, cleanData } = useStateData({})
  const { change } = useDeals()

  const handleSubmit = async () => {
    setError()
    setResult()
    if (data.deal && data.user) {
      const resp = await change(data)
      if (resp.success) {
        setResult(resp)
      } else {
        setError('Error en el procesamiento')
      }
    } else {
      setError('Debes ingresar ambos campos')
    }
  }

  return (
    <>
      <HeaderSection title='Cambiar de cliente a tratos'>
      </HeaderSection>
      <Box>
        <Form.Item>
          <Input
            required
            placeholder="ID del trato"
            onChange={value => changeData('deal', value.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            required
            placeholder="ID del usuario"
            onChange={value => changeData('user', value.target.value)}
          />
        </Form.Item>
        {
          error &&
          <>
            <Alert message={error} type="error" />
            <br></br>
          </>
        }
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Cambiar de usuario
          </Button>
        </Form.Item>
        <br></br>
        <TextArea rows={10} placeholder='Respuesta' value={JSON.stringify(result, undefined, 2)} />
      </Box>
    </>
  )
}
