import Link from 'next/link'
import { Actions, ActionButton } from './style'

export const HeaderActions = ({
  path,
  loading,
  handleSubmit,
  isSaveClean,
  btnName
}) => {
  return (
    <Actions>
      <Link href={path}>
        <ActionButton disabled={loading}>Cancelar</ActionButton>
      </Link>
      {isSaveClean && (
        <ActionButton onClick={() => handleSubmit(false)} loading={loading}>
          Guardar y agregar otro
        </ActionButton>
      )}
      <ActionButton
        type='primary'
        onClick={() => handleSubmit(true)}
        loading={loading}
      >
        {btnName}
      </ActionButton>
    </Actions>
  )
}
