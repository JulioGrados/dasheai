import {
  listTemplates,
  createTemplate,
  detailTemplate,
  updateTemplate,
  removeTemplate
} from 'utils/api/templates'

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

const LOADING_GET_TEMPLATES = 'LOADING_GET_TEMPLATES'
const SUCCESS_GET_TEMPLATES = 'SUCCESS_GET_TEMPLATES'
const ERROR_GET_TEMPLATES = 'ERROR_GET_TEMPLATES'

const LOADING_ADD_TEMPLATE = 'LOADING_ADD_TEMPLATE'
const SUCCESS_ADD_TEMPLATE = 'SUCCESS_ADD_TEMPLATE'
const ERROR_ADD_TEMPLATE = 'ERROR_ADD_TEMPLATE'

const LOADING_GET_TEMPLATE = 'LOADING_GET_TEMPLATE'
const SUCCESS_GET_TEMPLATE = 'SUCCESS_GET_TEMPLATE'
const ERROR_GET_TEMPLATE = 'ERROR_GET_TEMPLATE'

const LOADING_EDIT_TEMPLATE = 'LOADING_EDIT_TEMPLATE'
const SUCCESS_EDIT_TEMPLATE = 'SUCCESS_EDIT_TEMPLATE'
const ERROR_EDIT_TEMPLATE = 'ERROR_EDIT_TEMPLATE'

const LOADING_DELETE_TEMPLATE = 'LOADING_DELETE_TEMPLATE'
const SUCCESS_DELETE_TEMPLATE = 'SUCCESS_DELETE_TEMPLATE'
const ERROR_DELETE_TEMPLATE = 'ERROR_DELETE_TEMPLATE'

const LOADING_SEARCH_TEMPLATES = 'LOADING_SEARCH_TEMPLATE'
const SUCCESS_SEARCH_TEMPLATES = 'SUCCESS_SEARCH_TEMPLATE'
const ERROR_SEARCH_TEMPLATES = 'ERROR_SEARCH_TEMPLATE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // SEARCH
    case LOADING_SEARCH_TEMPLATES: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_TEMPLATES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_TEMPLATES: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // LIST
    case LOADING_GET_TEMPLATES: {
      return loadingReducer(state)
    }
    case ERROR_GET_TEMPLATES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_TEMPLATES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_TEMPLATE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_TEMPLATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_TEMPLATE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_TEMPLATE: {
      return loadingReducer(state)
    }
    case ERROR_GET_TEMPLATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_TEMPLATE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_TEMPLATE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_TEMPLATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_TEMPLATE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_TEMPLATE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_TEMPLATE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_TEMPLATE: {
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
export const getTemplates = (params, extra = {}) => {
  return {
    types: [LOADING_GET_TEMPLATES, SUCCESS_GET_TEMPLATES, ERROR_GET_TEMPLATES],
    promise: () => listTemplates(params),
    ...extra
  }
}

export const addTemplate = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_TEMPLATE, SUCCESS_ADD_TEMPLATE, ERROR_ADD_TEMPLATE],
    promise: () => createTemplate(data),
    ...extra
  }
}

export const getTemplate = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_TEMPLATE, SUCCESS_GET_TEMPLATE, ERROR_GET_TEMPLATE],
    promise: () => detailTemplate(id, params),
    ...extra
  }
}

export const editTemplate = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_TEMPLATE, SUCCESS_EDIT_TEMPLATE, ERROR_EDIT_TEMPLATE],
    promise: () => updateTemplate(id, data),
    ...extra
  }
}

export const deleteTemplate = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_TEMPLATE,
      SUCCESS_DELETE_TEMPLATE,
      ERROR_DELETE_TEMPLATE
    ],
    promise: () => removeTemplate(id),
    ...extra
  }
}

export const searchTemplate = (params, extra = {}) => {
  return {
    types: [LOADING_SEARCH_TEMPLATES, SUCCESS_SEARCH_TEMPLATES, ERROR_SEARCH_TEMPLATES],
    promise: () => listTemplates(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
