import {
  listDeals,
  createDeal,
  detailDeal,
  mixDeal,
  changeDeal,
  updateDeal,
  updateDealOne,
  removeDeal
} from 'utils/api/deals'

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
  mix: null,
  change: null,
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_DEALS = 'LOADING_GET_DEALS'
const SUCCESS_GET_DEALS = 'SUCCESS_GET_DEALS'
const ERROR_GET_DEALS = 'ERROR_GET_DEALS'

const LOADING_ADD_DEAL = 'LOADING_ADD_DEAL'
const SUCCESS_ADD_DEAL = 'SUCCESS_ADD_DEAL'
const ERROR_ADD_DEAL = 'ERROR_ADD_DEAL'

const LOADING_GET_DEAL = 'LOADING_GET_DEAL'
const SUCCESS_GET_DEAL = 'SUCCESS_GET_DEAL'
const ERROR_GET_DEAL = 'ERROR_GET_DEAL'

const LOADING_EDIT_DEAL = 'LOADING_EDIT_DEAL'
const SUCCESS_EDIT_DEAL = 'SUCCESS_EDIT_DEAL'
const ERROR_EDIT_DEAL = 'ERROR_EDIT_DEAL'

const LOADING_DELETE_DEAL = 'LOADING_DELETE_DEAL'
const SUCCESS_DELETE_DEAL = 'SUCCESS_DELETE_DEAL'
const ERROR_DELETE_DEAL = 'ERROR_DELETE_DEAL'

const LOADING_MIX_DEAL = 'LOADING_MIX_DEAL'
const SUCCESS_MIX_DEAL = 'SUCCESS_MIX_DEAL'
const ERROR_MIX_DEAL = 'ERROR_MIX_DEAL'

const LOADING_CHANGE_DEAL = 'LOADING_CHANGE_DEAL'
const SUCCESS_CHANGE_DEAL = 'SUCCESS_CHANGE_DEAL'
const ERROR_CHANGE_DEAL = 'ERROR_CHANGE_DEAL'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_DEALS: {
      return loadingReducer(state)
    }
    case ERROR_GET_DEALS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_DEALS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_DEAL: {
      return loadingReducer(state)
    }
    case ERROR_ADD_DEAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_DEAL: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_DEAL: {
      return loadingReducer(state)
    }
    case ERROR_GET_DEAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_DEAL: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_DEAL: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_DEAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_DEAL: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // MIX
    case LOADING_MIX_DEAL: {
      return loadingReducer(state)
    }
    case ERROR_MIX_DEAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_MIX_DEAL: {
      return successReducer(state, {
        mix: action.payload
      })
    }
    // CHANGE
    case LOADING_CHANGE_DEAL: {
      return loadingReducer(state)
    }
    case ERROR_CHANGE_DEAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_CHANGE_DEAL: {
      return successReducer(state, {
        change: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_DEAL: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_DEAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_DEAL: {
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
export const getDeals = (params, extra = {}) => {
  return {
    types: [LOADING_GET_DEALS, SUCCESS_GET_DEALS, ERROR_GET_DEALS],
    promise: () => listDeals(params),
    ...extra
  }
}

export const addDeal = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_DEAL, SUCCESS_ADD_DEAL, ERROR_ADD_DEAL],
    promise: () => createDeal(data),
    ...extra
  }
}

export const getDeal = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_DEAL, SUCCESS_GET_DEAL, ERROR_GET_DEAL],
    promise: () => detailDeal(id, params),
    ...extra
  }
}

export const editDeal = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_DEAL, SUCCESS_EDIT_DEAL, ERROR_EDIT_DEAL],
    promise: () => updateDealOne(id, data),
    ...extra
  }
}

export const combineDeal = (data, extra = {}) => {
  return {
    types: [LOADING_MIX_DEAL, SUCCESS_MIX_DEAL, ERROR_MIX_DEAL],
    promise: () => mixDeal(data),
    ...extra
  }
}

export const clientDeal = (data, extra = {}) => {
  return {
    types: [LOADING_CHANGE_DEAL, SUCCESS_CHANGE_DEAL, ERROR_CHANGE_DEAL],
    promise: () => changeDeal(data),
    ...extra
  }
}

export const deleteDeal = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_DEAL, SUCCESS_DELETE_DEAL, ERROR_DELETE_DEAL],
    promise: () => removeDeal(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
