import {
  listPayments,
  createPayment,
  detailPayment,
  updatePayment,
  removePayment
} from 'utils/api/payments'

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
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_PAYMENTS = 'LOADING_GET_PAYMENTS'
const SUCCESS_GET_PAYMENTS = 'SUCCESS_GET_PAYMENTS'
const ERROR_GET_PAYMENTS = 'ERROR_GET_PAYMENTS'

const LOADING_ADD_PAYMENT = 'LOADING_ADD_PAYMENT'
const SUCCESS_ADD_PAYMENT = 'SUCCESS_ADD_PAYMENT'
const ERROR_ADD_PAYMENT = 'ERROR_ADD_PAYMENT'

const LOADING_GET_PAYMENT = 'LOADING_GET_PAYMENT'
const SUCCESS_GET_PAYMENT = 'SUCCESS_GET_PAYMENT'
const ERROR_GET_PAYMENT = 'ERROR_GET_PAYMENT'

const LOADING_EDIT_PAYMENT = 'LOADING_EDIT_PAYMENT'
const SUCCESS_EDIT_PAYMENT = 'SUCCESS_EDIT_PAYMENT'
const ERROR_EDIT_PAYMENT = 'ERROR_EDIT_PAYMENT'

const LOADING_DELETE_PAYMENT = 'LOADING_DELETE_PAYMENT'
const SUCCESS_DELETE_PAYMENT = 'SUCCESS_DELETE_PAYMENT'
const ERROR_DELETE_PAYMENT = 'ERROR_DELETE_PAYMENT'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_PAYMENTS: {
      return loadingReducer(state)
    }
    case ERROR_GET_PAYMENTS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_PAYMENTS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_PAYMENT: {
      return loadingReducer(state)
    }
    case ERROR_ADD_PAYMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_PAYMENT: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_PAYMENT: {
      return loadingReducer(state)
    }
    case ERROR_GET_PAYMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_PAYMENT: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_PAYMENT: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_PAYMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_PAYMENT: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_PAYMENT: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_PAYMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_PAYMENT: {
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
export const getPayments = (params, extra = {}) => {
  return {
    types: [LOADING_GET_PAYMENTS, SUCCESS_GET_PAYMENTS, ERROR_GET_PAYMENTS],
    promise: () => listPayments(params),
    ...extra
  }
}

export const addPayment = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_PAYMENT, SUCCESS_ADD_PAYMENT, ERROR_ADD_PAYMENT],
    promise: () => createPayment(data),
    ...extra
  }
}

export const getPayment = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_PAYMENT, SUCCESS_GET_PAYMENT, ERROR_GET_PAYMENT],
    promise: () => detailPayment(id, params),
    ...extra
  }
}

export const editPayment = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_PAYMENT, SUCCESS_EDIT_PAYMENT, ERROR_EDIT_PAYMENT],
    promise: () => updatePayment(id, data),
    ...extra
  }
}

export const deletePayment = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_PAYMENT,
      SUCCESS_DELETE_PAYMENT,
      ERROR_DELETE_PAYMENT
    ],
    promise: () => removePayment(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
