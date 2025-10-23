import { SelectAssessor } from 'components-path'

import { useAssessor } from '../../hooks'

export const SelectAssessors = ({ reasign, onSelect }) => {
  const { assessors, loading } = useAssessor()

  const handleSelect = id => {
    const item = assessors.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectAssessor = reasign && {
    ...reasign,
    _id: reasign._id || reasign.ref
  }

  return (
    <SelectAssessor
      users={assessors}
      user={selectAssessor}
      loading={loading}
      onSelect={handleSelect}
    />
  )
}
