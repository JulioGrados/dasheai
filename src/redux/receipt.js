import {
  listReceipts,
  createReceipt,
  detailAdminReceipt,
  updateAdminReceipt,
  onlyUpdateReceipt,
  removeReceipt,
  resetAdminReceipt,
  noteAdminReceipt
} from 'utils/api/receipts'

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

const LOADING_GET_RECEIPTS = 'LOADING_GET_RECEIPTS'
const SUCCESS_GET_RECEIPTS = 'SUCCESS_GET_RECEIPTS'
const ERROR_GET_RECEIPTS = 'ERROR_GET_RECEIPTS'

const LOADING_SEARCH_RECEIPTS = 'LOADING_SEARCH_RECEIPTS'
const SUCCESS_SEARCH_RECEIPTS = 'SUCCESS_SEARCH_RECEIPTS'
const ERROR_SEARCH_RECEIPTS = 'ERROR_SEARCH_RECEIPTS'

const LOADING_ADD_RECEIPT = 'LOADING_ADD_RECEIPT'
const SUCCESS_ADD_RECEIPT = 'SUCCESS_ADD_RECEIPT'
const ERROR_ADD_RECEIPT = 'ERROR_ADD_RECEIPT'

const LOADING_GET_RECEIPT = 'LOADING_GET_RECEIPT'
const SUCCESS_GET_RECEIPT = 'SUCCESS_GET_RECEIPT'
const ERROR_GET_RECEIPT = 'ERROR_GET_RECEIPT'

const LOADING_EDIT_RECEIPT = 'LOADING_EDIT_RECEIPT'
const SUCCESS_EDIT_RECEIPT = 'SUCCESS_EDIT_RECEIPT'
const ERROR_EDIT_RECEIPT = 'ERROR_EDIT_RECEIPT'

const LOADING_DELETE_RECEIPT = 'LOADING_DELETE_RECEIPT'
const SUCCESS_DELETE_RECEIPT = 'SUCCESS_DELETE_RECEIPT'
const ERROR_DELETE_RECEIPT = 'ERROR_DELETE_RECEIPT'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_RECEIPTS: {
      return loadingReducer(state)
    }
    case ERROR_GET_RECEIPTS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_RECEIPTS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // SEARCH
    case LOADING_SEARCH_RECEIPTS: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_RECEIPTS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_RECEIPTS: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // CREATE
    case LOADING_ADD_RECEIPT: {
      return loadingReducer(state)
    }
    case ERROR_ADD_RECEIPT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_RECEIPT: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_RECEIPT: {
      return loadingReducer(state)
    }
    case ERROR_GET_RECEIPT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_RECEIPT: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_RECEIPT: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_RECEIPT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_RECEIPT: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_RECEIPT: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_RECEIPT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_RECEIPT: {
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
export const getReceipts = (params, extra = {}) => {
  return {
    types: [LOADING_GET_RECEIPTS, SUCCESS_GET_RECEIPTS, ERROR_GET_RECEIPTS],
    promise: () => listReceipts(params),
    ...extra
  }
}

export const addReceipt = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_RECEIPT, SUCCESS_ADD_RECEIPT, ERROR_ADD_RECEIPT],
    promise: () => createReceipt(data),
    ...extra
  }
}

export const getReceipt = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_RECEIPT, SUCCESS_GET_RECEIPT, ERROR_GET_RECEIPT],
    promise: () => detailAdminReceipt(id, params),
    ...extra
  }
}

export const editReceipt = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_RECEIPT, SUCCESS_EDIT_RECEIPT, ERROR_EDIT_RECEIPT],
    promise: () => onlyUpdateReceipt(id, data),
    ...extra
  }
}

export const cancelReceipt = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_RECEIPT, SUCCESS_EDIT_RECEIPT, ERROR_EDIT_RECEIPT],
    promise: () => updateAdminReceipt(id, data),
    ...extra
  }
}

export const deleteReceipt = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_RECEIPT,
      SUCCESS_DELETE_RECEIPT,
      ERROR_DELETE_RECEIPT
    ],
    promise: () => removeReceipt(id),
    ...extra
  }
}

export const resetReceipt = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_RECEIPT, SUCCESS_DELETE_RECEIPT, ERROR_DELETE_RECEIPT],
    promise: () => resetAdminReceipt(id),
    ...extra
  }
}

export const noteReceipt = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_RECEIPT, SUCCESS_EDIT_RECEIPT, ERROR_EDIT_RECEIPT],
    promise: () => noteAdminReceipt(id, data),
    ...extra
  }
}

export const searchReceipt = (params, extra = {}) => {
  return {
    types: [
      LOADING_SEARCH_RECEIPTS,
      SUCCESS_SEARCH_RECEIPTS,
      ERROR_SEARCH_RECEIPTS
    ],
    promise: () => listReceipts(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
