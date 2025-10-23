import { Form, Alert, Input, Button } from 'antd'
import { Box, HeaderSection } from '../../components'

import { useDeals, useStateData } from '../../hooks'
import { useState } from 'react'
const { TextArea } = Input

export const DealMix = () => {
  const [error, setError] = useState()
  const [result, setResult] = useState()
  const { data, changeData, cleanData } = useStateData({})
  const { mix } = useDeals()

  const handleSubmit = async () => {
    setError()
    setResult()
    if (data.primary && data.secundary) {
      const resp = await mix(data)
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
      <HeaderSection title='Combinar tratos'>
      </HeaderSection>
      <Box>
        <Form.Item>
          <Input
            required
            placeholder="ID del trato principal"
            onChange={value => changeData('primary', value.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            required
            placeholder="ID del trato secundario"
            onChange={value => changeData('secundary', value.target.value)}
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
            Fusionar
          </Button>
        </Form.Item>
        <br></br>
        <TextArea rows={10} placeholder='Respuesta' value={JSON.stringify(result, undefined, 2)} />
      </Box>
    </>
  )
}
