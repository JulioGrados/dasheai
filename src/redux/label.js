import {
  listLabels,
  createLabel,
  detailLabel,
  updateLabel,
  removeLabel
} from 'utils/api/labels'

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

const LOADING_GET_LABELS = 'LOADING_GET_LABELS'
const SUCCESS_GET_LABELS = 'SUCCESS_GET_LABELS'
const ERROR_GET_LABELS = 'ERROR_GET_LABELS'

const LOADING_ADD_LABEL = 'LOADING_ADD_LABEL'
const SUCCESS_ADD_LABEL = 'SUCCESS_ADD_LABEL'
const ERROR_ADD_LABEL = 'ERROR_ADD_LABEL'

const LOADING_GET_LABEL = 'LOADING_GET_LABEL'
const SUCCESS_GET_LABEL = 'SUCCESS_GET_LABEL'
const ERROR_GET_LABEL = 'ERROR_GET_LABEL'

const LOADING_EDIT_LABEL = 'LOADING_EDIT_LABEL'
const SUCCESS_EDIT_LABEL = 'SUCCESS_EDIT_LABEL'
const ERROR_EDIT_LABEL = 'ERROR_EDIT_LABEL'

const LOADING_DELETE_LABEL = 'LOADING_DELETE_LABEL'
const SUCCESS_DELETE_LABEL = 'SUCCESS_DELETE_LABEL'
const ERROR_DELETE_LABEL = 'ERROR_DELETE_LABEL'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_LABELS: {
      return loadingReducer(state)
    }
    case ERROR_GET_LABELS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_LABELS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_LABEL: {
      return loadingReducer(state)
    }
    case ERROR_ADD_LABEL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_LABEL: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_LABEL: {
      return loadingReducer(state)
    }
    case ERROR_GET_LABEL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_LABEL: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_LABEL: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_LABEL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_LABEL: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_LABEL: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_LABEL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_LABEL: {
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
export const getLabels = (params, extra = {}) => {
  return {
    types: [LOADING_GET_LABELS, SUCCESS_GET_LABELS, ERROR_GET_LABELS],
    promise: () => listLabels(params),
    ...extra
  }
}

export const addLabel = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_LABEL, SUCCESS_ADD_LABEL, ERROR_ADD_LABEL],
    promise: () => createLabel(data),
    ...extra
  }
}

export const getLabel = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_LABEL, SUCCESS_GET_LABEL, ERROR_GET_LABEL],
    promise: () => detailLabel(id, params),
    ...extra
  }
}

export const editLabel = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_LABEL, SUCCESS_EDIT_LABEL, ERROR_EDIT_LABEL],
    promise: () => updateLabel(id, data),
    ...extra
  }
}

export const deleteLabel = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_LABEL, SUCCESS_DELETE_LABEL, ERROR_DELETE_LABEL],
    promise: () => removeLabel(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
