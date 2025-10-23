import {
  listVouchers,
  createVoucher,
  detailAdminVoucher,
  updateVoucher,
  resetAdminVoucher,
  removeVoucher
} from 'utils/api/vouchers'

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
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_VOUCHERS = 'LOADING_GET_VOUCHERS'
const SUCCESS_GET_VOUCHERS = 'SUCCESS_GET_VOUCHERS'
const ERROR_GET_VOUCHERS = 'ERROR_GET_VOUCHERS'

const LOADING_SEARCH_VOUCHERS = 'LOADING_SEARCH_VOUCHERS'
const SUCCESS_SEARCH_VOUCHERS = 'SUCCESS_SEARCH_VOUCHERS'
const ERROR_SEARCH_VOUCHERS = 'ERROR_SEARCH_VOUCHERS'

const LOADING_ADD_VOUCHER = 'LOADING_ADD_VOUCHER'
const SUCCESS_ADD_VOCUHER = 'SUCCESS_ADD_VOCUHER'
const ERROR_ADD_VOUCHER = 'ERROR_ADD_VOUCHER'

const LOADING_GET_VOUCHER = 'LOADING_GET_VOUCHER'
const SUCCESS_GET_VOUCHER = 'SUCCESS_GET_VOUCHER'
const ERROR_GET_VOUCHER = 'ERROR_GET_VOUCHER'

const LOADING_EDIT_VOUCHER = 'LOADING_EDIT_VOUCHER'
const SUCCESS_EDIT_VOUCHER = 'SUCCESS_EDIT_VOUCHER'
const ERROR_EDIT_VOUCHER = 'ERROR_EDIT_VOUCHER'

const LOADING_DELETE_VOUCHER = 'LOADING_DELETE_VOUCHER'
const SUCCESS_DELETE_VOUCHER = 'SUCCESS_DELETE_VOUCHER'
const ERROR_DELETE_VOUCHER = 'ERROR_DELETE_VOUCHER'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_VOUCHERS: {
      return loadingReducer(state)
    }
    case ERROR_GET_VOUCHERS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_VOUCHERS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // SEARCH
    case LOADING_SEARCH_VOUCHERS: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_VOUCHERS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_VOUCHERS: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // CREATE
    case LOADING_ADD_VOUCHER: {
      return loadingReducer(state)
    }
    case ERROR_ADD_VOUCHER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_VOCUHER: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_VOUCHER: {
      return loadingReducer(state)
    }
    case ERROR_GET_VOUCHER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_VOUCHER: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_VOUCHER: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_VOUCHER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_VOUCHER: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_VOUCHER: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_VOUCHER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_VOUCHER: {
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
export const getVouchers = (params, extra = {}) => {
  return {
    types: [LOADING_GET_VOUCHERS, SUCCESS_GET_VOUCHERS, ERROR_GET_VOUCHERS],
    promise: () => listVouchers(params),
    ...extra
  }
}

export const addVoucher = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_VOUCHER, SUCCESS_ADD_VOCUHER, ERROR_ADD_VOUCHER],
    promise: () => createVoucher(data),
    ...extra
  }
}

export const getVoucher = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_VOUCHER, SUCCESS_GET_VOUCHER, ERROR_GET_VOUCHER],
    promise: () => detailAdminVoucher(id, params),
    ...extra
  }
}

export const editVoucher = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_VOUCHER, SUCCESS_EDIT_VOUCHER, ERROR_EDIT_VOUCHER],
    promise: () => updateVoucher(id, data),
    ...extra
  }
}

export const resetVoucher = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_VOUCHER, SUCCESS_EDIT_VOUCHER, ERROR_EDIT_VOUCHER],
    promise: () => resetAdminVoucher(id, data),
    ...extra
  }
}

export const deleteVoucher = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_VOUCHER,
      SUCCESS_DELETE_VOUCHER,
      ERROR_DELETE_VOUCHER
    ],
    promise: () => removeVoucher(id),
    ...extra
  }
}

export const searchVoucher = (params, extra = {}) => {
  return {
    types: [
      LOADING_SEARCH_VOUCHERS,
      SUCCESS_SEARCH_VOUCHERS,
      ERROR_SEARCH_VOUCHERS
    ],
    promise: () => listVouchers(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
