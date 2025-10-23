import { Table, TableOptions } from 'components-path'
import { Input, Select, Button } from 'antd'
import currenciesData from 'utils/functions/currencies'
import { useState } from 'react'

export const SelectCoin = ({ coins = [], onChange }) => {
  const [mount, setMount] = useState()
  const [mountOffert, setMountOffert] = useState()
  const [money, setMoney] = useState()
  const coinsList = coins && coins.map((coin, index) => {
    return {
      ...coin,
      id: index
    }
  })
  
  const handleDelete = id => {
    const index = coinsList.findIndex(item => item.id === id)
    if (index !== -1) {
      coinsList.splice(index, 1)
    }
    onChange(coinsList)
  }
  const handleSelect = coin => {
    const index = coinsList.findIndex(item => item.code === coin)
    if (index === -1) {
      setMoney(coin)
    } 
  }

  const handleAdd = () => {
    if (mount && mountOffert && money) {
      const element = currenciesData.find(item => item.code === money)
      const data = {
        ...element,
        price: mount,
        priceOffert: mountOffert
      }
      coinsList.push(data)
      onChange(coinsList)
      setMount(), setMountOffert(), setMoney()
    } else {
      console.log('Falta información')
    }
  }

  const columns = [
    {
      title: 'Simbolo',
      dataIndex: 'symbol',
      key: 'symbol'
    },
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Descuento',
      dataIndex: 'priceOffert',
      key: 'priceOffert'
    },
    {
      title: 'Opciones',
      dataIndex: 'id',
      key: 'id',
      render: code => (
        <TableOptions
          id={code}
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar está moneda?'
        />
      )
    }
  ]

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Input value={mount} placeholder="Ingresar precio" onChange={event => setMount(event.target.value)} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input value={mountOffert} placeholder="Ingresar precio de oferta" onChange={event => setMountOffert(event.target.value)} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder='Selecciona la moneda'
          showSearch
          value={money}
          onSelect={handleSelect}
        >
          {currenciesData.map((item, idx) => (
            <Select.Option key={idx} value={item.code}>
              {item.code}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button type="link" onClick={handleAdd}>Agregar moneda</Button>
      </div>
      <Table
        size='small'
        columns={columns}
        dataSource={coinsList}
        rowKey='id'
      />
    </>
  )
}
