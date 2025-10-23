import {
  listCertificates,
  listDealCertificates,
  createAdminCertificate,
  createCertificateMoodle,
  detailCertificate,
  updateAdminCertificate,
  removeCertificate
} from 'utils/api/certificates'

import { reducers } from 'utils'

const {
  errorReducer,
  cleanReducer,
  loadingReducer,
  successReducer,
  updateItem,
  removeItem
} = reducers

// const
const initialValue = {
  list: [],
  temp: [],
  add: [],
  newCertificates: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_CERTIFICATES = 'LOADING_GET_CERTIFICATES'
const SUCCESS_GET_CERTIFICATES = 'SUCCESS_GET_CERTIFICATES'
const ERROR_GET_CERTIFICATES = 'ERROR_GET_CERTIFICATES'

const LOADING_DEALAGREE_CERTIFICATES = 'LOADING_DEALAGREE_CERTIFICATES'
const SUCCESS_DEALAGREE_CERTIFICATES = 'SUCCESS_DEALAGREE_CERTIFICATES'
const ERROR_DEALAGREE_CERTIFICATES = 'ERROR_DEALAGREE_CERTIFICATES'

const LOADING_SEARCH_CERTIFICATES = 'LOADING_SEARCH_CERTIFICATES'
const SUCCESS_SEARCH_CERTIFICATES = 'SUCCESS_SEARCH_CERTIFICATES'
const ERROR_SEARCH_CERTIFICATES = 'ERROR_SEARCH_CERTIFICATES'

const LOADING_ADD_CERTIFICATE = 'LOADING_ADD_CERTIFICATE'
const SUCCESS_ADD_CERTIFICATE = 'SUCCESS_ADD_CERTIFICATE'
const ERROR_ADD_CERTIFICATE = 'ERROR_ADD_CERTIFICATE'

const LOADING_GET_CERTIFICATE = 'LOADING_GET_CERTIFICATE'
const SUCCESS_GET_CERTIFICATE = 'SUCCESS_GET_CERTIFICATE'
const ERROR_GET_CERTIFICATE = 'ERROR_GET_CERTIFICATE'

const LOADING_EDIT_CERTIFICATE = 'LOADING_EDIT_CERTIFICATE'
const SUCCESS_EDIT_CERTIFICATE = 'SUCCESS_EDIT_CERTIFICATE'
const ERROR_EDIT_CERTIFICATE = 'ERROR_EDIT_CERTIFICATE'

const LOADING_DELETE_CERTIFICATE = 'LOADING_DELETE_CERTIFICATE'
const SUCCESS_DELETE_CERTIFICATE = 'SUCCESS_DELETE_CERTIFICATE'
const ERROR_DELETE_CERTIFICATE = 'ERROR_DELETE_CERTIFICATE'

const LOADING_ADD_CERTIFICATEMOODLE = 'LOADING_ADD_CERTIFICATEMOODLE'
const SUCCESS_ADD_CERTIFICATEMOODLE = 'SUCCESS_ADD_CERTIFICATEMOODLE'
const ERROR_ADD_CERTIFICATEMOODLE = 'ERROR_ADD_CERTIFICATEMOODLE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CERTIFICATES: {
      return loadingReducer(state)
    }
    case ERROR_GET_CERTIFICATES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CERTIFICATES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // DEALAGREE
    case LOADING_DEALAGREE_CERTIFICATES: {
      return loadingReducer(state)
    }
    case ERROR_DEALAGREE_CERTIFICATES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DEALAGREE_CERTIFICATES: {
      return successReducer(state, {
        add: action.payload,
        loaded: true
      })
    }
    // SEARCH
    case LOADING_SEARCH_CERTIFICATES: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_CERTIFICATES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_CERTIFICATES: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // CREATE
    case LOADING_ADD_CERTIFICATE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CERTIFICATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CERTIFICATE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }

    // CREATE MOODLE
    case LOADING_ADD_CERTIFICATEMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CERTIFICATEMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CERTIFICATEMOODLE: {
      return successReducer(state, {
        newCertificates: action.payload
      })
    }
    // DETAIL
    case LOADING_GET_CERTIFICATE: {
      return loadingReducer(state)
    }
    case ERROR_GET_CERTIFICATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CERTIFICATE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CERTIFICATE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CERTIFICATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CERTIFICATE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CERTIFICATE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CERTIFICATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CERTIFICATE: {
      return successReducer(state, {
        list: removeItem(state.list, action.payload)
      })
    }
    // CLEAN
    case RELOAD_STATE: {
      return cleanReducer(state)
    }
    default:
      return state
  }
}

// actions
export const getCertificates = (params, extra = {}) => {
  return {
    types: [
      LOADING_GET_CERTIFICATES,
      SUCCESS_GET_CERTIFICATES,
      ERROR_GET_CERTIFICATES
    ],
    promise: () => listCertificates(params),
    ...extra
  }
}

export const listDealAgreements = (params) => {
  return {
    types: [
      LOADING_DEALAGREE_CERTIFICATES,
      SUCCESS_DEALAGREE_CERTIFICATES,
      ERROR_DEALAGREE_CERTIFICATES
    ],
    promise: () => listDealCertificates(params)
  }
}

export const addCertificate = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_CERTIFICATE,
      SUCCESS_ADD_CERTIFICATE,
      ERROR_ADD_CERTIFICATE
    ],
    promise: () => createAdminCertificate(data),
    ...extra
  }
}

export const addCertificatesMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_CERTIFICATEMOODLE,
      SUCCESS_ADD_CERTIFICATEMOODLE,
      ERROR_ADD_CERTIFICATEMOODLE
    ],
    promise: () => createCertificateMoodle(data),
    ...extra
  }
}

export const getCertificate = (id, params, extra = {}) => {
  params = { populate: ['linked.ref', 'course.ref'] }
  return {
    types: [
      LOADING_GET_CERTIFICATE,
      SUCCESS_GET_CERTIFICATE,
      ERROR_GET_CERTIFICATE
    ],
    promise: () => detailCertificate(id, params),
    ...extra
  }
}

export const editCertificate = (id, data, extra = {}) => {
  return {
    types: [
      LOADING_EDIT_CERTIFICATE,
      SUCCESS_EDIT_CERTIFICATE,
      ERROR_EDIT_CERTIFICATE
    ],
    promise: () => updateAdminCertificate(id, data),
    ...extra
  }
}

export const deleteCertificate = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_CERTIFICATE,
      SUCCESS_DELETE_CERTIFICATE,
      ERROR_DELETE_CERTIFICATE
    ],
    promise: () => removeCertificate(id),
    ...extra
  }
}

export const searchCertificate = (params, extra = {}) => {
  return {
    types: [
      LOADING_SEARCH_CERTIFICATES,
      SUCCESS_SEARCH_CERTIFICATES,
      ERROR_SEARCH_CERTIFICATES
    ],
    promise: () => listCertificates(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
