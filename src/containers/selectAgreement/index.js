import { SelectAgreement } from 'components-path'
import { useEffect } from 'react'

import { getAgreements } from 'redux-path/agreement'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectAgreements = ({ agreement, onSelect }) => {
  const { list, loading } = useReduxState('agreement')
  const fetchAgreements = useReduxFetch(getAgreements)

  useEffect(() => {
    if (list.length === 0) {
      fetchAgreements()
    }
  }, [])

  const handleSelect = id => {
    const item = list.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectAgreement = agreement && {
    ...agreement,
    _id: agreement._id || agreement.ref
  }

  return (
    <SelectAgreement
      agreements={list}
      agreement={selectAgreement}
      loading={loading}
      onSelect={handleSelect}
    />
  )
}
