import {
  listMetas,
  createMeta,
  detailMeta,
  updateMeta,
  removeMeta
} from 'utils/api/metas'

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

const LOADING_GET_METAS = 'LOADING_GET_METAS'
const SUCCESS_GET_METAS = 'SUCCESS_GET_METAS'
const ERROR_GET_METAS = 'ERROR_GET_METAS'

const LOADING_ADD_META = 'LOADING_ADD_META'
const SUCCESS_ADD_META = 'SUCCESS_ADD_META'
const ERROR_ADD_META = 'ERROR_ADD_META'

const LOADING_GET_META = 'LOADING_GET_META'
const SUCCESS_GET_META = 'SUCCESS_GET_META'
const ERROR_GET_META = 'ERROR_GET_META'

const LOADING_EDIT_META = 'LOADING_EDIT_META'
const SUCCESS_EDIT_META = 'SUCCESS_EDIT_META'
const ERROR_EDIT_META = 'ERROR_EDIT_META'

const LOADING_DELETE_META = 'LOADING_DELETE_META'
const SUCCESS_DELETE_META = 'SUCCESS_DELETE_META'
const ERROR_DELETE_META = 'ERROR_DELETE_META'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_METAS: {
      return loadingReducer(state)
    }
    case ERROR_GET_METAS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_METAS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_META: {
      return loadingReducer(state)
    }
    case ERROR_ADD_META: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_META: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_META: {
      return loadingReducer(state)
    }
    case ERROR_GET_META: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_META: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_META: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_META: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_META: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_META: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_META: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_META: {
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
export const getMetas = (params, extra = {}) => {
  return {
    types: [LOADING_GET_METAS, SUCCESS_GET_METAS, ERROR_GET_METAS],
    promise: () => listMetas(params),
    ...extra
  }
}

export const addMeta = (data, extra = {}) => {
  console.log('data', data)
  return {
    types: [LOADING_ADD_META, SUCCESS_ADD_META, ERROR_ADD_META],
    promise: () => createMeta(data),
    ...extra
  }
}

export const getMeta = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_META, SUCCESS_GET_META, ERROR_GET_META],
    promise: () => detailMeta(id, params),
    ...extra
  }
}

export const editMeta = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_META, SUCCESS_EDIT_META, ERROR_EDIT_META],
    promise: () => updateMeta(id, data),
    ...extra
  }
}

export const deleteMeta = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_META, SUCCESS_DELETE_META, ERROR_DELETE_META],
    promise: () => removeMeta(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
