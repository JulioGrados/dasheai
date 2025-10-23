import {
  listCalls,
  createCall,
  detailCall,
  updateCall,
  removeCall
} from 'utils/api/calls'

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

const LOADING_GET_CALLS = 'LOADING_GET_CALLS'
const SUCCESS_GET_CALLS = 'SUCCESS_GET_CALLS'
const ERROR_GET_CALLS = 'ERROR_GET_CALLS'

const LOADING_ADD_CALL = 'LOADING_ADD_CALL'
const SUCCESS_ADD_CALL = 'SUCCESS_ADD_CALL'
const ERROR_ADD_CALL = 'ERROR_ADD_CALL'

const LOADING_GET_CALL = 'LOADING_GET_CALL'
const SUCCESS_GET_CALL = 'SUCCESS_GET_CALL'
const ERROR_GET_CALL = 'ERROR_GET_CALL'

const LOADING_EDIT_CALL = 'LOADING_EDIT_CALL'
const SUCCESS_EDIT_CALL = 'SUCCESS_EDIT_CALL'
const ERROR_EDIT_CALL = 'ERROR_EDIT_CALL'

const LOADING_DELETE_CALL = 'LOADING_DELETE_CALL'
const SUCCESS_DELETE_CALL = 'SUCCESS_DELETE_CALL'
const ERROR_DELETE_CALL = 'ERROR_DELETE_CALL'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CALLS: {
      return loadingReducer(state)
    }
    case ERROR_GET_CALLS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CALLS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CALL: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CALL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CALL: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CALL: {
      return loadingReducer(state)
    }
    case ERROR_GET_CALL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CALL: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CALL: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CALL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CALL: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CALL: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CALL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CALL: {
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
export const getCalls = (params, extra = {}) => {
  return {
    types: [LOADING_GET_CALLS, SUCCESS_GET_CALLS, ERROR_GET_CALLS],
    promise: () => listCalls(params),
    ...extra
  }
}

export const addCall = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CALL, SUCCESS_ADD_CALL, ERROR_ADD_CALL],
    promise: () => createCall(data),
    ...extra
  }
}

export const getCall = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_CALL, SUCCESS_GET_CALL, ERROR_GET_CALL],
    promise: () => detailCall(id, params),
    ...extra
  }
}

export const editCall = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CALL, SUCCESS_EDIT_CALL, ERROR_EDIT_CALL],
    promise: () => updateCall(id, data),
    ...extra
  }
}

export const deleteCall = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_CALL, SUCCESS_DELETE_CALL, ERROR_DELETE_CALL],
    promise: () => removeCall(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
