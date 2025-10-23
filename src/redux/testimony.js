import {
  listTestimonies,
  createTestimony,
  createTestimonyMoodle,
  detailTestimony,
  updateTestimony,
  removeTestimony
} from 'utils/api/testimonies'

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

const LOADING_GET_TESTIMONIES = 'LOADING_GET_TESTIMONIES'
const SUCCESS_GET_TESTIMONIES = 'SUCCESS_GET_TESTIMONIES'
const ERROR_GET_TESTIMONIES = 'ERROR_GET_TESTIMONIES'

const LOADING_ADD_TESTIMONY = 'LOADING_ADD_TESTIMONY'
const SUCCESS_ADD_TESTIMONY = 'SUCCESS_ADD_TESTIMONY'
const ERROR_ADD_TESTIMONY = 'ERROR_ADD_TESTIMONY'

const LOADING_GET_TESTIMONY = 'LOADING_GET_TESTIMONY'
const SUCCESS_GET_TESTIMONY = 'SUCCESS_GET_TESTIMONY'
const ERROR_GET_TESTIMONY = 'ERROR_GET_TESTIMONY'

const LOADING_EDIT_TESTIMONY = 'LOADING_EDIT_TESTIMONY'
const SUCCESS_EDIT_TESTIMONY = 'SUCCESS_EDIT_TESTIMONY'
const ERROR_EDIT_TESTIMONY = 'ERROR_EDIT_TESTIMONY'

const LOADING_DELETE_TESTIMONY = 'LOADING_DELETE_TESTIMONY'
const SUCCESS_DELETE_TESTIMONY = 'SUCCESS_DELETE_TESTIMONY'
const ERROR_DELETE_TESTIMONY = 'ERROR_DELETE_TESTIMONY'

const LOADING_ADD_TESTIMONYMOODLE = 'LOADING_ADD_TESTIMONYMOODLE'
const SUCCESS_ADD_TESTIMONYMOODLE = 'SUCCESS_ADD_TESTIMONYMOODLE'
const ERROR_ADD_TESTIMONYMOODLE = 'ERROR_ADD_TESTIMONYMOODLE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_TESTIMONIES: {
      return loadingReducer(state)
    }
    case ERROR_GET_TESTIMONIES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_TESTIMONIES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_TESTIMONY: {
      return loadingReducer(state)
    }
    case ERROR_ADD_TESTIMONY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_TESTIMONY: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // CREATE MOODLE
    case LOADING_ADD_TESTIMONYMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_TESTIMONYMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_TESTIMONYMOODLE: {
      return successReducer(state, {
        newLessons: action.payload
      })
    }
    // DETAIL
    case LOADING_GET_TESTIMONY: {
      return loadingReducer(state)
    }
    case ERROR_GET_TESTIMONY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_TESTIMONY: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_TESTIMONY: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_TESTIMONY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_TESTIMONY: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_TESTIMONY: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_TESTIMONY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_TESTIMONY: {
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
export const getTestimonies = (params, extra = {}) => {
  return {
    types: [
      LOADING_GET_TESTIMONIES,
      SUCCESS_GET_TESTIMONIES,
      ERROR_GET_TESTIMONIES
    ],
    promise: () => listTestimonies(params),
    ...extra
  }
}

export const addTestimony = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_TESTIMONY, SUCCESS_ADD_TESTIMONY, ERROR_ADD_TESTIMONY],
    promise: () => createTestimony(data),
    ...extra
  }
}

export const addTestimoniesMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_TESTIMONYMOODLE,
      SUCCESS_ADD_TESTIMONYMOODLE,
      ERROR_ADD_TESTIMONYMOODLE
    ],
    promise: () => createTestimonyMoodle(data),
    ...extra
  }
}

export const getTestimony = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_TESTIMONY, SUCCESS_GET_TESTIMONY, ERROR_GET_TESTIMONY],
    promise: () => detailTestimony(id, params),
    ...extra
  }
}

export const editTestimony = (id, data, extra = {}) => {
  return {
    types: [
      LOADING_EDIT_TESTIMONY,
      SUCCESS_EDIT_TESTIMONY,
      ERROR_EDIT_TESTIMONY
    ],
    promise: () => updateTestimony(id, data),
    ...extra
  }
}

export const deleteTestimony = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_TESTIMONY,
      SUCCESS_DELETE_TESTIMONY,
      ERROR_DELETE_TESTIMONY
    ],
    promise: () => removeTestimony(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
