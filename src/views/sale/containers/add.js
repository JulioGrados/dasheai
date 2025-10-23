import { SaleForm } from 'views-path/sale/components/form'

import { addSale } from 'redux-path/sale'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddSale = () => {
  const saleState = useReduxState('sale')
  const createSale = useReduxAdd(addSale, 'Se creo la venta correctamente')

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/ventas' : ''
    createSale(data, urlRedirect, callback)
  }

  return <SaleForm {...saleState} title='Crear Venta' onSubmit={handleSubmit} />
}

export default AddSale
