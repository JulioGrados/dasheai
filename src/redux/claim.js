import {
  listClaims,
  createClaim,
  detailClaim,
  updateClaim,
  removeClaim
} from 'utils/api/claims'

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

const LOADING_GET_CLAIMS = 'LOADING_GET_CLAIMS'
const SUCCESS_GET_CLAIMS = 'SUCCESS_GET_CLAIMS'
const ERROR_GET_CLAIMS = 'ERROR_GET_CLAIMS'

const LOADING_ADD_CLAIM = 'LOADING_ADD_CLAIM'
const SUCCESS_ADD_CLAIM = 'SUCCESS_ADD_CLAIM'
const ERROR_ADD_CLAIM = 'ERROR_ADD_CLAIM'

const LOADING_GET_CLAIM = 'LOADING_GET_CLAIM'
const SUCCESS_GET_CLAIM = 'SUCCESS_GET_CLAIM'
const ERROR_GET_CLAIM = 'ERROR_GET_CLAIM'

const LOADING_EDIT_CLAIM = 'LOADING_EDIT_CLAIM'
const SUCCESS_EDIT_CLAIM = 'SUCCESS_EDIT_CLAIM'
const ERROR_EDIT_CLAIM = 'ERROR_EDIT_CLAIM'

const LOADING_DELETE_CLAIM = 'LOADING_DELETE_CLAIM'
const SUCCESS_DELETE_CLAIM = 'SUCCESS_DELETE_CLAIM'
const ERROR_DELETE_CLAIM = 'ERROR_DELETE_CLAIM'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CLAIMS: {
      return loadingReducer(state)
    }
    case ERROR_GET_CLAIMS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CLAIMS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CLAIM: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CLAIM: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CLAIM: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CLAIM: {
      return loadingReducer(state)
    }
    case ERROR_GET_CLAIM: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CLAIM: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CLAIM: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CLAIM: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CLAIM: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CLAIM: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CLAIM: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CLAIM: {
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
export const getClaims = (params, extra = {}) => {
  return {
    types: [LOADING_GET_CLAIMS, SUCCESS_GET_CLAIMS, ERROR_GET_CLAIMS],
    promise: () => listClaims(params),
    ...extra
  }
}

export const addClaim = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CLAIM, SUCCESS_ADD_CLAIM, ERROR_ADD_CLAIM],
    promise: () => createClaim(data),
    ...extra
  }
}

export const getClaim = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_CLAIM, SUCCESS_GET_CLAIM, ERROR_GET_CLAIM],
    promise: () => detailClaim(id, params),
    ...extra
  }
}

export const editClaim = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CLAIM, SUCCESS_EDIT_CLAIM, ERROR_EDIT_CLAIM],
    promise: () => updateClaim(id, data),
    ...extra
  }
}

export const deleteClaim = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_CLAIM,
      SUCCESS_DELETE_CLAIM,
      ERROR_DELETE_CLAIM
    ],
    promise: () => removeClaim(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
