import {
  listAgreements,
  createAgreement,
  detailAgreement,
  updateAgreement,
  removeAgreement
} from 'utils/api/agreements'
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

const LOADING_GET_AGREEMENTS = 'LOADING_GET_AGREEMENTS'
const SUCCESS_GET_AGREEMENTS = 'SUCCESS_GET_AGREEMENTS'
const ERROR_GET_AGREEMENTS = 'ERROR_GET_AGREEMENTS'

const LOADING_ADD_AGREEMENT = 'LOADING_ADD_AGREEMENT'
const SUCCESS_ADD_AGREEMENT = 'SUCCESS_ADD_AGREEMENT'
const ERROR_ADD_AGREEMENT = 'ERROR_ADD_AGREEMENT'

const LOADING_GET_AGREEMENT = 'LOADING_GET_AGREEMENT'
const SUCCESS_GET_AGREEMENT = 'SUCCESS_GET_AGREEMENT'
const ERROR_GET_AGREEMENT = 'ERROR_GET_AGREEMENT'

const LOADING_EDIT_AGREEMENT = 'LOADING_EDIT_AGREEMENT'
const SUCCESS_EDIT_AGREEMENT = 'SUCCESS_EDIT_AGREEMENT'
const ERROR_EDIT_AGREEMENT = 'ERROR_EDIT_AGREEMENT'

const LOADING_DELETE_AGREEMENT = 'LOADING_DELETE_AGREEMENT'
const SUCCESS_DELETE_AGREEMENT = 'SUCCESS_DELETE_AGREEMENT'
const ERROR_DELETE_AGREEMENT = 'ERROR_DELETE_AGREEMENT'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_AGREEMENTS: {
      return loadingReducer(state)
    }
    case ERROR_GET_AGREEMENTS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_AGREEMENTS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_AGREEMENT: {
      return loadingReducer(state)
    }
    case ERROR_ADD_AGREEMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_AGREEMENT: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_AGREEMENT: {
      return loadingReducer(state)
    }
    case ERROR_GET_AGREEMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_AGREEMENT: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_AGREEMENT: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_AGREEMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_AGREEMENT: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_AGREEMENT: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_AGREEMENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_AGREEMENT: {
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
export const getAgreements = (params, extra = {}) => {
  return {
    types: [
      LOADING_GET_AGREEMENTS,
      SUCCESS_GET_AGREEMENTS,
      ERROR_GET_AGREEMENTS
    ],
    promise: () => listAgreements(params),
    ...extra
  }
}

export const addAgreement = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_AGREEMENT, SUCCESS_ADD_AGREEMENT, ERROR_ADD_AGREEMENT],
    promise: () => createAgreement(data),
    ...extra
  }
}

export const getAgreement = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_AGREEMENT, SUCCESS_GET_AGREEMENT, ERROR_GET_AGREEMENT],
    promise: () => detailAgreement(id, params),
    ...extra
  }
}

export const editAgreement = (id, data, extra = {}) => {
  return {
    types: [
      LOADING_EDIT_AGREEMENT,
      SUCCESS_EDIT_AGREEMENT,
      ERROR_EDIT_AGREEMENT
    ],
    promise: () => updateAgreement(id, data),
    ...extra
  }
}

export const deleteAgreement = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_AGREEMENT,
      SUCCESS_DELETE_AGREEMENT,
      ERROR_DELETE_AGREEMENT
    ],
    promise: () => removeAgreement(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
