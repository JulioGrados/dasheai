import { listLogs, createLog, detailLog } from 'utils/api/logs'

import { reducers } from 'utils'

const { errorReducer, cleanReducer, loadingReducer, successReducer } = reducers

// const
const initialValue = {
  list: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_LOGS = 'LOADING_GET_LOGS'
const SUCCESS_GET_LOGS = 'SUCCESS_GET_LOGS'
const ERROR_GET_LOGS = 'ERROR_GET_LOGS'

const LOADING_ADD_LOG = 'LOADING_ADD_LOG'
const SUCCESS_ADD_LOG = 'SUCCESS_ADD_LOG'
const ERROR_ADD_LOG = 'ERROR_ADD_LOG'

const LOADING_GET_LOG = 'LOADING_GET_LOG'
const SUCCESS_GET_LOG = 'SUCCESS_GET_LOG'
const ERROR_GET_LOG = 'ERROR_GET_LOG'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_LOGS: {
      return loadingReducer(state)
    }
    case ERROR_GET_LOGS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_LOGS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_LOG: {
      return loadingReducer(state)
    }
    case ERROR_ADD_LOG: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_LOG: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_LOG: {
      return loadingReducer(state)
    }
    case ERROR_GET_LOG: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_LOG: {
      return successReducer(state, {
        current: action.payload
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
export const getLogs = (params, extra = {}) => {
  return {
    types: [LOADING_GET_LOGS, SUCCESS_GET_LOGS, ERROR_GET_LOGS],
    promise: () => listLogs(params),
    ...extra
  }
}

export const addLog = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_LOG, SUCCESS_ADD_LOG, ERROR_ADD_LOG],
    promise: () => createLog(data),
    ...extra
  }
}

export const getLog = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_LOG, SUCCESS_GET_LOG, ERROR_GET_LOG],
    promise: () => detailLog(id, params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
