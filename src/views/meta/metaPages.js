import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

import { FormSection, FormLeft, FormRight } from '../../components'

export const MetaPages = ({ pages = [], onChange }) => {
  const handleAddPage = () => {
    pages.push({
      name: '',
      root: '',
      title: '',
      description: ''
    })
    onChange(pages, 'pages')
  }

  const handleChange = (idx, name, value) => {
    pages[idx][name] = value
    onChange(pages, 'pages')
  }

  const hadleDelete = idx => {
    pages.splice(idx, 1)
    onChange(pages, 'pages')
  }

  return (
    <>
      {pages.length === 0 && (
        <Button type='primary' onClick={handleAddPage}>
          Añadir Pagina
        </Button>
      )}

      {pages.map((item, idx) => (
        <FormSection key={idx} hasLine>
          <FormLeft title='Pagina' name={item.name}>
            <Button type='danger' onClick={() => hadleDelete(idx)}>
              Eliminar
            </Button>{' '}
          </FormLeft>
          <FormRight>
            <FormItem label='Nombre'>
              <Input
                placeholder='nombre'
                value={item.name}
                onChange={e => handleChange(idx, 'name', e.target.value)}
              />
            </FormItem>
            <FormItem label='Ruta'>
              <Input
                placeholder='/cursos/[slug]'
                value={item.root}
                onChange={e => handleChange(idx, 'root', e.target.value)}
              />
            </FormItem>
            <FormItem
              label='Titulo'
              extra='Puedes usar variables encerradas en dobles llaves, asi {{variable}}, entre las variables que puedes usar son name, shortName, price, academicHours, published, teacherName'
            >
              <Input
                placeholder='Titulo'
                value={item.title}
                onChange={e => handleChange(idx, 'title', e.target.value)}
              />
            </FormItem>
            <FormItem
              label='Descripción'
              extra='Puedes usar variables encerradas en dobles llaves, asi {{variable}}, entre las variables que puedes usar son name, shortName, price, academicHours, published, teacherName'
            >
              <Input.TextArea
                placeholder='Descripción'
                value={item.description}
                onChange={e => handleChange(idx, 'description', e.target.value)}
              />
            </FormItem>
          </FormRight>
        </FormSection>
      ))}
      {pages.length > 0 && <Button onClick={handleAddPage}>Añadir Otra</Button>}
    </>
  )
}
