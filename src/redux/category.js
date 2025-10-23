import {
  listCategories,
  createCategory,
  detailCategory,
  updateCategory,
  removeCategory
} from 'utils/api/categories'

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

const LOADING_GET_CATEGORIES = 'LOADING_GET_CATEGORIES'
const SUCCESS_GET_CATEGORIES = 'SUCCESS_GET_CATEGORIES'
const ERROR_GET_CATEGORIES = 'ERROR_GET_CATEGORIES'

const LOADING_ADD_CATEGORY = 'LOADING_ADD_CATEGORY'
const SUCCESS_ADD_CATEGORY = 'SUCCESS_ADD_CATEGORY'
const ERROR_ADD_CATEGORY = 'ERROR_ADD_CATEGORY'

const LOADING_GET_CATEGORY = 'LOADING_GET_CATEGORY'
const SUCCESS_GET_CATEGORY = 'SUCCESS_GET_CATEGORY'
const ERROR_GET_CATEGORY = 'ERROR_GET_CATEGORY'

const LOADING_EDIT_CATEGORY = 'LOADING_EDIT_CATEGORY'
const SUCCESS_EDIT_CATEGORY = 'SUCCESS_EDIT_CATEGORY'
const ERROR_EDIT_CATEGORY = 'ERROR_EDIT_CATEGORY'

const LOADING_DELETE_CATEGORY = 'LOADING_DELETE_CATEGORY'
const SUCCESS_DELETE_CATEGORY = 'SUCCESS_DELETE_CATEGORY'
const ERROR_DELETE_CATEGORY = 'ERROR_DELETE_CATEGORY'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CATEGORIES: {
      return loadingReducer(state)
    }
    case ERROR_GET_CATEGORIES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CATEGORIES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CATEGORY: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CATEGORY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CATEGORY: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CATEGORY: {
      return loadingReducer(state)
    }
    case ERROR_GET_CATEGORY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CATEGORY: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CATEGORY: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CATEGORY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CATEGORY: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CATEGORY: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CATEGORY: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CATEGORY: {
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
export const getCategories = (params, extra = {}) => {
  return {
    types: [
      LOADING_GET_CATEGORIES,
      SUCCESS_GET_CATEGORIES,
      ERROR_GET_CATEGORIES
    ],
    promise: () => listCategories(params),
    ...extra
  }
}

export const addCategory = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CATEGORY, SUCCESS_ADD_CATEGORY, ERROR_ADD_CATEGORY],
    promise: () => createCategory(data),
    ...extra
  }
}

export const getCategory = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_CATEGORY, SUCCESS_GET_CATEGORY, ERROR_GET_CATEGORY],
    promise: () => detailCategory(id, params),
    ...extra
  }
}

export const editCategory = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CATEGORY, SUCCESS_EDIT_CATEGORY, ERROR_EDIT_CATEGORY],
    promise: () => updateCategory(id, data),
    ...extra
  }
}

export const deleteCategory = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_CATEGORY,
      SUCCESS_DELETE_CATEGORY,
      ERROR_DELETE_CATEGORY
    ],
    promise: () => removeCategory(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
