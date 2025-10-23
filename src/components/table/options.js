import Link from 'next/link'

import { Popconfirm } from 'antd'
import { TableContent, TableOptionsItem, TableOptionsItemIcon } from './styles'

export const TableOptions = ({
  id,
  path,
  item,
  onEdit,
  confirm,
  onDelete,
  view,
  edit = true,
  role,
  target = false
}) => {
  return (
    <TableContent>
      {view && (
        <Link href={`/${path}/detail/[id]`} as={`/${path}/detail/${id}`}>
          <TableOptionsItem>
            <TableOptionsItemIcon type='eye' />
          </TableOptionsItem>
        </Link>
      )}
      {path && edit && (
        target ?
          (
            <TableOptionsItem target='_blank' href={`/${path}/${id}/`}>
              <TableOptionsItemIcon type='edit' />
            </TableOptionsItem>
          )
          :
          (
            <Link
              href={{ pathname: `/${path}/[id]`, query: { role } }}
              as={`/${path}/${id}${role ? `?role=${role}` : ''}`}
            >
              <TableOptionsItem>
                <TableOptionsItemIcon type='edit' />
              </TableOptionsItem>
            </Link>
          )
      )}
      {onEdit && (
        <TableOptionsItem onClick={() => onEdit(item)}>
          <TableOptionsItemIcon type='edit' />
        </TableOptionsItem>
      )}
      {onDelete && (
        <Popconfirm
          title={confirm}
          onConfirm={() => onDelete(id)}
          okText='Si'
          cancelText='No'
        >
          <TableOptionsItem>
            <TableOptionsItemIcon type='delete' />
          </TableOptionsItem>
        </Popconfirm>
      )}
    </TableContent>
  )
}
