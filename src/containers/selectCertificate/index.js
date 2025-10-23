import { SelectCertificate } from 'components-path'

import { searchCertificate } from '../../redux/certificate'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectCertificates = ({ certificate, onSelect }) => {
  const { temp, loading } = useReduxState('certificate')
  const fetchCertificate = useReduxFetch(searchCertificate)

  const handleSearch = value => {
    const params = {
      query: {
        code: { $regex: value, $options: 'i' }
      },
      limit: 20,
      select: 'code'
    }

    fetchCertificate(params)
  }

  const handleSelect = id => {
    const item = temp.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectCertificate = certificate && {
    ...certificate,
    _id: certificate._id || certificate.ref
  }

  if (selectCertificate && !temp.find(item => item._id === selectCertificate._id)) {
    temp.push(selectCertificate)
  }

  return (
    <SelectCertificate
      certificates={temp}
      certificate={selectCertificate}
      loading={loading}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  )
}
