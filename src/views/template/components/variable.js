import { Icon, Col } from 'antd'
import { Row, Button, Select, Input } from 'antd'

export const Variable = ({ varibale, id, onChange, onDelete }) => {
  const options = getOptions()

  const handleSelect = field => {
    const data = {
      name: varibale.name,
      field
    }
    onChange(id, data)
  }

  const handleCahnge = name => {
    const data = {
      name,
      field: varibale.field
    }

    onChange(id, data)
  }

  const inputValue = varibale && varibale.name

  let selected
  if (varibale && varibale.field) {
    selected = varibale.field
  }

  return (
    <>
      <Row type='flex' justify='space-around'>
        <Col span={10}>
          <Input
            placeholder='Nombre de la variable'
            value={inputValue}
            onChange={e => handleCahnge(e.target.value)}
          />
        </Col>
        <Col span={10} offset={1}>
          <Select
            placeholder='Selecciona el campo'
            onSelect={handleSelect}
            value={selected}
          >
            {options.map((item, idx) => (
              <Select.Option key={idx} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={2}>
          <Button type='link' onClick={() => onDelete(id)}>
            <Icon type='delete' />
          </Button>
        </Col>
      </Row>
    </>
  )
}

const getOptions = () => [
  {
    label: 'Nombre del Negocio',
    value: 'linked.shortName'
  },
  {
    label: 'Username del Negocio',
    value: 'linked.username'
  },
  {
    label: 'Nombre del Asesor',
    value: 'assigned.shortName'
  },
  {
    label: 'Número del Asesor',
    value: 'assigned.mobile'
  },
  {
    label: 'Nombre del curso',
    value: 'course.name'
  },
  {
    label: 'Fecha de inicio del curso',
    value: 'course.startCourse'
  },
  {
    label: 'Precio del curso',
    value: 'course.price'
  },
  {
    label: 'Precio oferta del curso',
    value: 'course.priceOffert'
  },
  {
    label: 'Brochure del curso',
    value: 'course.brochureDrive'
  },
  {
    label: 'Horas academicas del curso',
    value: 'course.academicHours'
  },
  {
    label: 'Nombre del Profesor',
    value: 'course.teacherName'
  },
  {
    label: 'Descripción del Profesor',
    value: 'course.teacherDescription'
  },
  {
    label: 'Primer Pago de la venta',
    value: 'sale.firstPayDate'
  },
  {
    label: 'saldo la venta',
    value: 'sale.residue'
  },
  {
    label: 'Plazo de pago',
    value: 'sale.closeDate'
  }
]
