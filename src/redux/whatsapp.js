import {
  listWhatsapps,
  createWhatsapp,
  detailWhatsapp,
  updateWhatsapp,
  sendCBWhatsapp,
  removeWhatsapp
} from 'utils/api/whatsapps'

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
  send: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const getArrayWhatsapps = (result) => {
  if (result.success) {
    delete result.success
    const whatsapp = Object.keys(result).map(key => {
      return result[key]
    })
    return whatsapp
  } else {
    return result
  }
}

const LOADING_GET_WHATSAPPS = 'LOADING_GET_WHATSAPPS'
const SUCCESS_GET_WHATSAPPS = 'SUCCESS_GET_WHATSAPPS'
const ERROR_GET_WHATSAPPS = 'ERROR_GET_WHATSAPPS'

const LOADING_ADD_WHATSAPP = 'LOADING_ADD_WHATSAPP'
const SUCCESS_ADD_WHATSAPP = 'SUCCESS_ADD_WHATSAPP'
const ERROR_ADD_WHATSAPP = 'ERROR_ADD_WHATSAPP'

const LOADING_GET_WHATSAPP = 'LOADING_GET_WHATSAPP'
const SUCCESS_GET_WHATSAPP = 'SUCCESS_GET_WHATSAPP'
const ERROR_GET_WHATSAPP = 'ERROR_GET_WHATSAPP'

const LOADING_EDIT_WHATSAPP = 'LOADING_EDIT_WHATSAPP'
const SUCCESS_EDIT_WHATSAPP = 'SUCCESS_EDIT_WHATSAPP'
const ERROR_EDIT_WHATSAPP = 'ERROR_EDIT_WHATSAPP'

const LOADING_SEND_WHATSAPP = 'LOADING_SEND_WHATSAPP'
const SUCCESS_SEND_WHATSAPP = 'SUCCESS_SEND_WHATSAPP'
const ERROR_SEND_WHATSAPP = 'ERROR_SEND_WHATSAPP'

const LOADING_DELETE_WHATSAPP = 'LOADING_DELETE_WHATSAPP'
const SUCCESS_DELETE_WHATSAPP = 'SUCCESS_DELETE_WHATSAPP'
const ERROR_DELETE_WHATSAPP = 'ERROR_DELETE_WHATSAPP'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_WHATSAPPS: {
      return loadingReducer(state)
    }
    case ERROR_GET_WHATSAPPS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_WHATSAPPS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_WHATSAPP: {
      return loadingReducer(state)
    }
    case ERROR_ADD_WHATSAPP: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_WHATSAPP: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_WHATSAPP: {
      return loadingReducer(state)
    }
    case ERROR_GET_WHATSAPP: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_WHATSAPP: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_WHATSAPP: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_WHATSAPP: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_WHATSAPP: {
      return successReducer(state, {
        list: updateItem(state, action.payload),
        current: action.payload
      })
    }
    // SEND
    case LOADING_SEND_WHATSAPP: {
      return loadingReducer(state)
    }
    case ERROR_SEND_WHATSAPP: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEND_WHATSAPP: {
      return successReducer(state, {
        send: getArrayWhatsapps(action.payload),
        loaded: true
      })
    }
    // DELETE
    case LOADING_DELETE_WHATSAPP: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_WHATSAPP: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_WHATSAPP: {
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
export const getWhatsapps = (params, extra = {}) => {
  return {
    types: [LOADING_GET_WHATSAPPS, SUCCESS_GET_WHATSAPPS, ERROR_GET_WHATSAPPS],
    promise: () => listWhatsapps(params),
    ...extra
  }
}

export const addWhatsapp = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_WHATSAPP, SUCCESS_ADD_WHATSAPP, ERROR_ADD_WHATSAPP],
    promise: () => createWhatsapp(data),
    ...extra
  }
}

export const getWhatsapp = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_WHATSAPP, SUCCESS_GET_WHATSAPP, ERROR_GET_WHATSAPP],
    promise: () => detailWhatsapp(id, params),
    ...extra
  }
}

export const editWhatsapp = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_WHATSAPP, SUCCESS_EDIT_WHATSAPP, ERROR_EDIT_WHATSAPP],
    promise: () => updateWhatsapp(id, data),
    ...extra
  }
}

export const sendWhatsapp = (params, extra = {}) => {
  return {
    types: [LOADING_SEND_WHATSAPP, SUCCESS_SEND_WHATSAPP, ERROR_SEND_WHATSAPP],
    promise: () => sendCBWhatsapp(params),
    ...extra
  }
}

export const deleteWhatsapp = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_WHATSAPP,
      SUCCESS_DELETE_WHATSAPP,
      ERROR_DELETE_WHATSAPP
    ],
    promise: () => removeWhatsapp(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
