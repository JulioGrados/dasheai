import {
  listSales,
  createSale,
  detailSale,
  updateSale,
  updateAdminSale,
  updateSaleOne,
  removeSale
} from 'utils/api/sales'
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

const LOADING_GET_SALES = 'LOADING_GET_SALES'
const SUCCESS_GET_SALES = 'SUCCESS_GET_SALES'
const ERROR_GET_SALES = 'ERROR_GET_SALES'

const LOADING_SEARCH_SALES = 'LOADING_SEARCH_SALES'
const SUCCESS_SEARCH_SALES = 'SUCCESS_SEARCH_SALES'
const ERROR_SEARCH_SALES = 'ERROR_SEARCH_SALES'

const LOADING_ADD_SALE = 'LOADING_ADD_SALE'
const SUCCESS_ADD_SALE = 'SUCCESS_ADD_SALE'
const ERROR_ADD_SALE = 'ERROR_ADD_SALE'

const LOADING_GET_SALE = 'LOADING_GET_SALE'
const SUCCESS_GET_SALE = 'SUCCESS_GET_SALE'
const ERROR_GET_SALE = 'ERROR_GET_SALE'

const LOADING_EDIT_SALE = 'LOADING_EDIT_SALE'
const SUCCESS_EDIT_SALE = 'SUCCESS_EDIT_SALE'
const ERROR_EDIT_SALE = 'ERROR_EDIT_SALE'

const LOADING_DELETE_SALE = 'LOADING_DELETE_SALE'
const SUCCESS_DELETE_SALE = 'SUCCESS_DELETE_SALE'
const ERROR_DELETE_SALE = 'ERROR_DELETE_SALE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_SALES: {
      return loadingReducer(state)
    }
    case ERROR_GET_SALES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_SALES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // SEARCH
    case LOADING_SEARCH_SALES: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_SALES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_SALES: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // CREATE
    case LOADING_ADD_SALE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_SALE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_SALE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_SALE: {
      return loadingReducer(state)
    }
    case ERROR_GET_SALE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_SALE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_SALE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_SALE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_SALE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_SALE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_SALE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_SALE: {
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
export const getSales = (params, extra = {}) => {
  console.log('params', params)
  return {
    types: [LOADING_GET_SALES, SUCCESS_GET_SALES, ERROR_GET_SALES],
    promise: () => listSales(params),
    ...extra
  }
}

export const addSale = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_SALE, SUCCESS_ADD_SALE, ERROR_ADD_SALE],
    promise: () => createSale(data),
    ...extra
  }
}

export const getSale = (id, params, extra = {}) => {
  params = { populate: ['user.ref', 'deal', 'orders'] }
  return {
    types: [LOADING_GET_SALE, SUCCESS_GET_SALE, ERROR_GET_SALE],
    promise: () => detailSale(id, params),
    ...extra
  }
}

export const editSale = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_SALE, SUCCESS_EDIT_SALE, ERROR_EDIT_SALE],
    promise: () => updateSaleOne(id, data),
    ...extra
  }
}

export const deleteSale = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_SALE, SUCCESS_DELETE_SALE, ERROR_DELETE_SALE],
    promise: () => removeSale(id),
    ...extra
  }
}

export const cancelSale = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_SALE, SUCCESS_EDIT_SALE, ERROR_EDIT_SALE],
    promise: () => updateAdminSale(id, data),
    ...extra
  }
}

export const searchSale = (params, extra = {}) => {
  return {
    types: [LOADING_SEARCH_SALES, SUCCESS_SEARCH_SALES, ERROR_SEARCH_SALES],
    promise: () => listSales(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
