import {
  listEmails,
  resendEmail,
  detailEmail,
  updateEmail,
  removeEmail,
  sendCBEmails
} from 'utils/api/emails'

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

const getArrayEmail = (result) => {
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

const LOADING_GET_EMAILS = 'LOADING_GET_EMAILS'
const SUCCESS_GET_EMAILS = 'SUCCESS_GET_EMAILS'
const ERROR_GET_EMAILS = 'ERROR_GET_EMAILS'

const LOADING_ADD_EMAIL = 'LOADING_ADD_EMAIL'
const SUCCESS_ADD_EMAIL = 'SUCCESS_ADD_EMAIL'
const ERROR_ADD_EMAIL = 'ERROR_ADD_EMAIL'

const LOADING_GET_EMAIL = 'LOADING_GET_EMAIL'
const SUCCESS_GET_EMAIL = 'SUCCESS_GET_EMAIL'
const ERROR_GET_EMAIL = 'ERROR_GET_EMAIL'

const LOADING_EDIT_EMAIL = 'LOADING_EDIT_EMAIL'
const SUCCESS_EDIT_EMAIL = 'SUCCESS_EDIT_EMAIL'
const ERROR_EDIT_EMAIL = 'ERROR_EDIT_EMAIL'

const LOADING_SEND_EMAIL = 'LOADING_SEND_EMAIL'
const SUCCESS_SEND_EMAIL = 'SUCCESS_SEND_EMAIL'
const ERROR_SEND_EMAIL = 'ERROR_SEND_EMAIL'

const LOADING_DELETE_EMAIL = 'LOADING_DELETE_EMAIL'
const SUCCESS_DELETE_EMAIL = 'SUCCESS_DELETE_EMAIL'
const ERROR_DELETE_EMAIL = 'ERROR_DELETE_EMAIL'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_EMAILS: {
      return loadingReducer(state)
    }
    case ERROR_GET_EMAILS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_EMAILS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_EMAIL: {
      return loadingReducer(state)
    }
    case ERROR_ADD_EMAIL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_EMAIL: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_EMAIL: {
      return loadingReducer(state)
    }
    case ERROR_GET_EMAIL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_EMAIL: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_EMAIL: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_EMAIL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_EMAIL: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // SEND
    case LOADING_SEND_EMAIL: {
      return loadingReducer(state)
    }
    case ERROR_SEND_EMAIL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEND_EMAIL: {
      return successReducer(state, {
        send: getArrayEmail (action.payload),
        loaded: true
      })
    }
    // DELETE
    case LOADING_DELETE_EMAIL: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_EMAIL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_EMAIL: {
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
export const getEmails = (params, extra = {}) => {
  return {
    types: [LOADING_GET_EMAILS, SUCCESS_GET_EMAILS, ERROR_GET_EMAILS],
    promise: () => listEmails(params),
    ...extra
  }
}

export const addEmail = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_EMAIL, SUCCESS_ADD_EMAIL, ERROR_ADD_EMAIL],
    promise: () => resendEmail(data),
    ...extra
  }
}

export const getEmail = (id, params, extra = {}) => {
  params = { populate: ['linked.ref', 'assigned.ref'] }
  return {
    types: [LOADING_GET_EMAIL, SUCCESS_GET_EMAIL, ERROR_GET_EMAIL],
    promise: () => detailEmail(id, params),
    ...extra
  }
}

export const editEmail = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_EMAIL, SUCCESS_EDIT_EMAIL, ERROR_EDIT_EMAIL],
    promise: () => updateEmail(id, data),
    ...extra
  }
}

export const sendEmail = (params, extra = {}) => {
  return {
    types: [LOADING_SEND_EMAIL, SUCCESS_SEND_EMAIL, ERROR_SEND_EMAIL],
    promise: () => sendCBEmails(params),
    ...extra
  }
}

export const deleteEmail = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_EMAIL,
      SUCCESS_DELETE_EMAIL,
      ERROR_DELETE_EMAIL
    ],
    promise: () => removeEmail(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
