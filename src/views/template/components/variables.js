import { useState, useEffect } from 'react'
import { Variable } from './variable'

import { Button, Form } from 'antd'

export const Variables = ({ variables = [], onChange }) => {
  const [showList, changeShowList] = useState(variables.length > 0)

  useEffect(() => {
    if (variables.length === 0) {
      changeShowList(false)
    }
  }, [variables.length])

  const handelAddShow = () => {
    handleAdd()
    changeShowList(true)
  }

  const handleChange = (id, data) => {
    variables[id] = data
    onChange(variables.slice())
  }

  const handleAdd = () => {
    variables.push({
      name: '',
      field: undefined
    })
    onChange(variables.slice())
  }

  const handleDelete = id => {
    variables.splice(id, 1)
    onChange(variables.slice())
  }

  return (
    <>
      {!showList && (
        <Button type='ghost' onClick={handelAddShow}>
          + Agregar Variables
        </Button>
      )}
      {showList && (
        <>
          {variables.map((varibale, idx) => (
            <Form.Item key={idx}>
              <Variable
                key={idx}
                id={idx}
                varibale={varibale}
                onChange={handleChange}
                onDelete={handleDelete}
              />
            </Form.Item>
          ))}
          <Button type='ghost' onClick={handleAdd}>
            + Anadir otro
          </Button>
        </>
      )}
    </>
  )
}
