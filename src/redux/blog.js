import {
  listBlogs,
  createBlog,
  detailBlog,
  updateBlog,
  removeBlog
} from 'utils/api/blog'
import { reducers } from 'utils'

const {
  errorReducer,
  cleanReducer,
  loadingReducer,
  successReducer,
  updateItem,
  removeItem
} = reducers

const initialValue = {
  list: [],
  temp: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_BLOGS = 'LOADING_GET_BLOGS'
const SUCCESS_GET_BLOGS = 'SUCCESS_GET_BLOGS'
const ERROR_GET_BLOGS = 'ERROR_GET_BLOGS'

const LOADING_ADD_BLOG = 'LOADING_ADD_BLOG'
const SUCCESS_ADD_BLOG = 'SUCCESS_ADD_BLOG'
const ERROR_ADD_BLOG = 'ERROR_ADD_BLOG'

const LOADING_GET_BLOG = 'LOADING_GET_BLOG'
const SUCCESS_GET_BLOG = 'SUCCESS_GET_BLOG'
const ERROR_GET_BLOG = 'ERROR_GET_BLOG'

const LOADING_EDIT_BLOG = 'LOADING_EDIT_BLOG'
const SUCCESS_EDIT_BLOG = 'SUCCESS_EDIT_BLOG'
const ERROR_EDIT_BLOG = 'ERROR_EDIT_BLOG'

const LOADING_DELETE_BLOG = 'LOADING_DELETE_BLOG'
const SUCCESS_DELETE_BLOG = 'SUCCESS_DELETE_BLOG'
const ERROR_DELETE_BLOG = 'ERROR_DELETE_BLOG'

const RELOAD_STATE_BLOG = 'RELOAD_STATE_BLOG'

export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_BLOGS: {
      return loadingReducer(state)
    }
    case ERROR_GET_BLOGS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_BLOGS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_BLOG: {
      return loadingReducer(state)
    }
    case ERROR_ADD_BLOG: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_BLOG: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_BLOG: {
      return loadingReducer(state)
    }
    case ERROR_GET_BLOG: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_BLOG: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_BLOG: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_BLOG: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_BLOG: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_BLOG: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_BLOG: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_BLOG: {
      return successReducer(state, {
        list: removeItem(state.list, action.payload)
      })
    }
    // CLEAN
    case RELOAD_STATE_BLOG: {
      return cleanReducer(state)
    }
    default:
      return state
  }
}

// actions
export const getBlogs = (params, extra = {}) => {
  return {
    types: [LOADING_GET_BLOGS, SUCCESS_GET_BLOGS, ERROR_GET_BLOGS],
    promise: () => listBlogs(params),
    ...extra
  }
}

export const addBlog = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_BLOG, SUCCESS_ADD_BLOG, ERROR_ADD_BLOG],
    promise: () => createBlog(data),
    ...extra
  }
}

export const getBlog = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_BLOG, SUCCESS_GET_BLOG, ERROR_GET_BLOG],
    promise: () => detailBlog(id, params),
    ...extra
  }
}

export const editBlog = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_BLOG, SUCCESS_EDIT_BLOG, ERROR_EDIT_BLOG],
    promise: () => updateBlog(id, data),
    ...extra
  }
}

export const deleteBlog = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_BLOG, SUCCESS_DELETE_BLOG, ERROR_DELETE_BLOG],
    promise: () => removeBlog(id),
    ...extra
  }
}

export const reloadStateBlog = () => {
  return {
    type: RELOAD_STATE_BLOG
  }
}
