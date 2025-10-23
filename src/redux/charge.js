import {
  listCharge,
  createCharge,
  detailCharge,
  updateCharge,
  removeCharge
} from 'utils/api/charge'

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

const LOADING_GET_CHARGES = 'LOADING_GET_CHARGES'
const SUCCESS_GET_CHARGES = 'SUCCESS_GET_CHARGES'
const ERROR_GET_CHARGES = 'ERROR_GET_CHARGES'

const LOADING_ADD_CHARGE = 'LOADING_ADD_CHARGE'
const SUCCESS_ADD_CHARGE = 'SUCCESS_ADD_CHARGE'
const ERROR_ADD_CHARGE = 'ERROR_ADD_CHARGE'

const LOADING_GET_CHARGE = 'LOADING_GET_CHARGE'
const SUCCESS_GET_CHARGE = 'SUCCESS_GET_CHARGE'
const ERROR_GET_CHARGE = 'ERROR_GET_CHARGE'

const LOADING_EDIT_CHARGE = 'LOADING_EDIT_CHARGE'
const SUCCESS_EDIT_CHARGE = 'SUCCESS_EDIT_CHARGE'
const ERROR_EDIT_CHARGE = 'ERROR_EDIT_CHARGE'

const LOADING_DELETE_CHARGE = 'LOADING_DELETE_CHARGE'
const SUCCESS_DELETE_CHARGE = 'SUCCESS_DELETE_CHARGE'
const ERROR_DELETE_CHARGE = 'ERROR_DELETE_CHARGE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CHARGES: {
      return loadingReducer(state)
    }
    case ERROR_GET_CHARGES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CHARGES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CHARGE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CHARGE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CHARGE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CHARGE: {
      return loadingReducer(state)
    }
    case ERROR_GET_CHARGE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CHARGE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CHARGE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CHARGE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CHARGE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CHARGE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CHARGE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CHARGE: {
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
export const getCharges = (params, extra = {}) => {
  return {
    types: [LOADING_GET_CHARGES, SUCCESS_GET_CHARGES, ERROR_GET_CHARGES],
    promise: () => listCharge(params),
    ...extra
  }
}

export const addCharge = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CHARGE, SUCCESS_ADD_CHARGE, ERROR_ADD_CHARGE],
    promise: () => createCharge(data),
    ...extra
  }
}

export const getCharge = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_CHARGE, SUCCESS_GET_CHARGE, ERROR_GET_CHARGE],
    promise: () => detailCharge(id, params),
    ...extra
  }
}

export const editCharge = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CHARGE, SUCCESS_EDIT_CHARGE, ERROR_EDIT_CHARGE],
    promise: () => updateCharge(id, data),
    ...extra
  }
}

export const deleteCharge = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_CHARGE,
      SUCCESS_DELETE_CHARGE,
      ERROR_DELETE_CHARGE
    ],
    promise: () => removeCharge(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
