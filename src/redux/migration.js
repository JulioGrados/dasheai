import {
  listMigrationCertificates,
  listMigrationSales
} from 'utils/api/migrations'

import { reducers } from 'utils'

const {
  errorReducer,
  cleanReducer,
  loadingReducer,
  successReducer
} = reducers

// const
const initialValue = {
  list: [],
  sales: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

// funciones

const getArrayCertificates = (result) => {
  if (result.success) {
    delete result.success
    const certificate = Object.keys(result).map(key => {
      return result[key]
    })
    return certificate
  } else {
    return result
  }
}

const LOADING_GET_CERTIFICATESMIGRATE = 'LOADING_GET_CERTIFICATESMIGRATE'
const SUCCESS_GET_CERTIFICATESMIGRATE = 'SUCCESS_GET_CERTIFICATESMIGRATE'
const ERROR_GET_CERTIFICATESMIGRATE = 'ERROR_GET_CERTIFICATESMIGRATE'

const LOADING_GET_SALES = 'LOADING_GET_SALES'
const SUCCESS_GET_SALES = 'SUCCESS_GET_SALES'
const ERROR_GET_SALES = 'ERROR_GET_SALES'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CERTIFICATESMIGRATE: {
      return loadingReducer(state)
    }
    case ERROR_GET_CERTIFICATESMIGRATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CERTIFICATESMIGRATE: {
      return successReducer(state, {
        list: getArrayCertificates(action.payload),
        loaded: true
      })
    }
    // LIST
    case LOADING_GET_SALES: {
      return loadingReducer(state)
    }
    case ERROR_GET_SALES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_SALES: {
      return successReducer(state, {
        sales: getArrayCertificates(action.payload),
        loaded: true
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
export const migrateCertificates = (params, extra = {}) => {
  return {
    types: [LOADING_GET_CERTIFICATESMIGRATE, SUCCESS_GET_CERTIFICATESMIGRATE, ERROR_GET_CERTIFICATESMIGRATE],
    promise: () => listMigrationCertificates(params),
    ...extra
  }
}

export const migrateSales = (params, extra = {}) => {
  return {
    types: [LOADING_GET_SALES, SUCCESS_GET_SALES, ERROR_GET_SALES],
    promise: () => listMigrationSales(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
