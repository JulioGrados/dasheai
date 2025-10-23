import {
  listOrders,
  createOrder,
  detailOrder,
  updateOrder,
  updateOrderAdmin,
  removeOrder
} from 'utils/api/orders'

import {
  errorReducer,
  cleanReducer,
  loadingReducer,
  successReducer,
  updateItem,
  removeItem
} from 'utils/functions/reducers'

// const
const initialValue = {
  list: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_ORDERS = 'LOADING_GET_ORDERS'
const SUCCESS_GET_ORDERS = 'SUCCESS_GET_ORDERS'
const ERROR_GET_ORDERS = 'ERROR_GET_ORDERS'

const LOADING_ADD_ORDER = 'LOADING_ADD_ORDER'
const SUCCESS_ADD_ORDER = 'SUCCESS_ADD_ORDER'
const ERROR_ADD_ORDER = 'ERROR_ADD_ORDER'

const LOADING_GET_ORDER = 'LOADING_GET_ORDER'
const SUCCESS_GET_ORDER = 'SUCCESS_GET_ORDER'
const ERROR_GET_ORDER = 'ERROR_GET_ORDER'

const LOADING_EDIT_ORDER = 'LOADING_EDIT_ORDER'
const SUCCESS_EDIT_ORDER = 'SUCCESS_EDIT_ORDER'
const ERROR_EDIT_ORDER = 'ERROR_EDIT_ORDER'

const LOADING_DELETE_ORDER = 'LOADING_DELETE_ORDER'
const SUCCESS_DELETE_ORDER = 'SUCCESS_DELETE_ORDER'
const ERROR_DELETE_ORDER = 'ERROR_DELETE_ORDER'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_ORDERS: {
      return loadingReducer(state)
    }
    case ERROR_GET_ORDERS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_ORDERS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_ORDER: {
      return loadingReducer(state)
    }
    case ERROR_ADD_ORDER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_ORDER: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_ORDER: {
      return loadingReducer(state)
    }
    case ERROR_GET_ORDER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_ORDER: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_ORDER: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_ORDER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_ORDER: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_ORDER: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_ORDER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_ORDER: {
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
export const getOrders = (params, extra = {}) => {
  return {
    types: [LOADING_GET_ORDERS, SUCCESS_GET_ORDERS, ERROR_GET_ORDERS],
    promise: () => listOrders(params),
    ...extra
  }
}

export const addOrder = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_ORDER, SUCCESS_ADD_ORDER, ERROR_ADD_ORDER],
    promise: () => createOrder(data),
    ...extra
  }
}

export const getOrder = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_ORDER, SUCCESS_GET_ORDER, ERROR_GET_ORDER],
    promise: () => detailOrder(id, params),
    ...extra
  }
}

export const editOrder = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_ORDER, SUCCESS_EDIT_ORDER, ERROR_EDIT_ORDER],
    promise: () => updateOrderAdmin(id, data),
    ...extra
  }
}

export const deleteOrder = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_ORDER,
      SUCCESS_DELETE_ORDER,
      ERROR_DELETE_ORDER
    ],
    promise: () => removeOrder(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
