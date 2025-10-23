import {
  listProgresses,
  createProgress,
  detailProgress,
  updateProgress,
  removeProgress
} from 'utils/api/progresses'
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

const LOADING_GET_PROGRESSES = 'LOADING_GET_PROGRESSES'
const SUCCESS_GET_PROGRESSES = 'SUCCESS_GET_PROGRESSES'
const ERROR_GET_PROGRESSES = 'ERROR_GET_PROGRESSES'

const LOADING_ADD_PROGRESS = 'LOADING_ADD_PROGRESS'
const SUCCESS_ADD_PROGRESS = 'SUCCESS_ADD_PROGRESS'
const ERROR_ADD_PROGRESS = 'ERROR_ADD_PROGRESS'

const LOADING_GET_PROGRESS = 'LOADING_GET_PROGRESS'
const SUCCESS_GET_PROGRESS = 'SUCCESS_GET_PROGRESS'
const ERROR_GET_PROGRESS = 'ERROR_GET_PROGRESS'

const LOADING_EDIT_PROGRESS = 'LOADING_EDIT_PROGRESS'
const SUCCESS_EDIT_PROGRESS = 'SUCCESS_EDIT_PROGRESS'
const ERROR_EDIT_PROGRESS = 'ERROR_EDIT_PROGRESS'

const LOADING_DELETE_PROGRESS = 'LOADING_DELETE_PROGRESS'
const SUCCESS_DELETE_PROGRESS = 'SUCCESS_DELETE_PROGRESS'
const ERROR_DELETE_PROGRESS = 'ERROR_DELETE_PROGRESS'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_PROGRESSES: {
      return loadingReducer(state)
    }
    case ERROR_GET_PROGRESSES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_PROGRESSES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_PROGRESS: {
      return loadingReducer(state)
    }
    case ERROR_ADD_PROGRESS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_PROGRESS: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_PROGRESS: {
      return loadingReducer(state)
    }
    case ERROR_GET_PROGRESS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_PROGRESS: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_PROGRESS: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_PROGRESS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_PROGRESS: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_PROGRESS: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_PROGRESS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_PROGRESS: {
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
export const getProgresses = (params, extra = {}) => {
  return {
    types: [
      LOADING_GET_PROGRESSES,
      SUCCESS_GET_PROGRESSES,
      ERROR_GET_PROGRESSES
    ],
    promise: () => listProgresses(params),
    ...extra
  }
}

export const addProgress = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_PROGRESS, SUCCESS_ADD_PROGRESS, ERROR_ADD_PROGRESS],
    promise: () => createProgress(data),
    ...extra
  }
}

export const getProgress = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_PROGRESS, SUCCESS_GET_PROGRESS, ERROR_GET_PROGRESS],
    promise: () => detailProgress(id, params),
    ...extra
  }
}

export const editProgress = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_PROGRESS, SUCCESS_EDIT_PROGRESS, ERROR_EDIT_PROGRESS],
    promise: () => updateProgress(id, data),
    ...extra
  }
}

export const deleteProgress = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_PROGRESS,
      SUCCESS_DELETE_PROGRESS,
      ERROR_DELETE_PROGRESS
    ],
    promise: () => removeProgress(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
