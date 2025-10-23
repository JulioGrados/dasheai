import {
  listCompanies,
  createCompany,
  detailCompany,
  updateCompany,
  removeCompany
} from 'utils/api/companies'

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

const LOADING_GET_CONPANIES = 'LOADING_GET_CONPANIES'
const SUCCESS_GET_CONPANIES = 'SUCCESS_GET_CONPANIES'
const ERROR_GET_CONPANIES = 'ERROR_GET_CONPANIES'

const LOADING_ADD_CONPANY = 'LOADING_ADD_CONPANY'
const SUCCESS_ADD_CONPANY = 'SUCCESS_ADD_CONPANY'
const ERROR_ADD_CONPANY = 'ERROR_ADD_CONPANY'

const LOADING_GET_CONPANY = 'LOADING_GET_CONPANY'
const SUCCESS_GET_CONPANY = 'SUCCESS_GET_CONPANY'
const ERROR_GET_CONPANY = 'ERROR_GET_CONPANY'

const LOADING_EDIT_CONPANY = 'LOADING_EDIT_CONPANY'
const SUCCESS_EDIT_CONPANY = 'SUCCESS_EDIT_CONPANY'
const ERROR_EDIT_CONPANY = 'ERROR_EDIT_CONPANY'

const LOADING_DELETE_CONPANY = 'LOADING_DELETE_CONPANY'
const SUCCESS_DELETE_CONPANY = 'SUCCESS_DELETE_CONPANY'
const ERROR_DELETE_CONPANY = 'ERROR_DELETE_CONPANY'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CONPANIES: {
      return loadingReducer(state)
    }
    case ERROR_GET_CONPANIES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CONPANIES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CONPANY: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CONPANY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CONPANY: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CONPANY: {
      return loadingReducer(state)
    }
    case ERROR_GET_CONPANY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CONPANY: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CONPANY: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CONPANY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CONPANY: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CONPANY: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CONPANY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CONPANY: {
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
export const getCompanies = (params, extra = {}) => {
  return {
    types: [LOADING_GET_CONPANIES, SUCCESS_GET_CONPANIES, ERROR_GET_CONPANIES],
    promise: () => listCompanies(params),
    ...extra
  }
}

export const addCompany = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CONPANY, SUCCESS_ADD_CONPANY, ERROR_ADD_CONPANY],
    promise: () => createCompany(data),
    ...extra
  }
}

export const getCompany = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_CONPANY, SUCCESS_GET_CONPANY, ERROR_GET_CONPANY],
    promise: () => detailCompany(id, params),
    ...extra
  }
}

export const editCompany = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CONPANY, SUCCESS_EDIT_CONPANY, ERROR_EDIT_CONPANY],
    promise: () => updateCompany(id, data),
    ...extra
  }
}

export const deleteCompany = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_CONPANY,
      SUCCESS_DELETE_CONPANY,
      ERROR_DELETE_CONPANY
    ],
    promise: () => removeCompany(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
