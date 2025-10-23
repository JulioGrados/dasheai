import { Table as TableAntd } from 'antd'

import { TableBody } from './styles'

export const Table = props => {
  return (
    <TableBody>
      <TableAntd
        locale={{
          filterConfirm: 'Ok',
          filterReset: 'Limpiar'
        }}
        {...props}
      />
    </TableBody>
  )
}
