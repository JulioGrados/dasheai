import {
  listCourses,
  createCourse,
  detailCourse,
  updateCourse,
  removeCourse
} from 'utils/api/courses'
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
  temp: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_COURSES = 'LOADING_GET_COURSES'
const SUCCESS_GET_COURSES = 'SUCCESS_GET_COURSES'
const ERROR_GET_COURSES = 'ERROR_GET_COURSES'

const LOADING_SEARCH_COURSES = 'LOADING_SEARCH_COURSES'
const SUCCESS_SEARCH_COURSES = 'SUCCESS_SEARCH_COURSES'
const ERROR_SEARCH_COURSES = 'ERROR_SEARCH_COURSES'

const LOADING_ADD_COURSE = 'LOADING_ADD_COURSE'
const SUCCESS_ADD_COURSE = 'SUCCESS_ADD_COURSE'
const ERROR_ADD_COURSE = 'ERROR_ADD_COURSE'

const LOADING_GET_COURSE = 'LOADING_GET_COURSE'
const SUCCESS_GET_COURSE = 'SUCCESS_GET_COURSE'
const ERROR_GET_COURSE = 'ERROR_GET_COURSE'

const LOADING_EDIT_COURSE = 'LOADING_EDIT_COURSE'
const SUCCESS_EDIT_COURSE = 'SUCCESS_EDIT_COURSE'
const ERROR_EDIT_COURSE = 'ERROR_EDIT_COURSE'

const LOADING_DELETE_COURSE = 'LOADING_DELETE_COURSE'
const SUCCESS_DELETE_COURSE = 'SUCCESS_DELETE_COURSE'
const ERROR_DELETE_COURSE = 'ERROR_DELETE_COURSE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_COURSES: {
      return loadingReducer(state)
    }
    case ERROR_GET_COURSES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_COURSES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // SEARCH
    case LOADING_SEARCH_COURSES: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_COURSES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_COURSES: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // CREATE
    case LOADING_ADD_COURSE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_COURSE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_COURSE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_COURSE: {
      return loadingReducer(state)
    }
    case ERROR_GET_COURSE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_COURSE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_COURSE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_COURSE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_COURSE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_COURSE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_COURSE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_COURSE: {
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
export const getCourses = (params, extra = {}) => {
  return {
    types: [LOADING_GET_COURSES, SUCCESS_GET_COURSES, ERROR_GET_COURSES],
    promise: () => listCourses(params),
    ...extra
  }
}

export const addCourse = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_COURSE, SUCCESS_ADD_COURSE, ERROR_ADD_COURSE],
    promise: () => createCourse(data),
    ...extra
  }
}

export const getCourse = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_COURSE, SUCCESS_GET_COURSE, ERROR_GET_COURSE],
    promise: () => detailCourse(id, params),
    ...extra
  }
}

export const editCourse = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_COURSE, SUCCESS_EDIT_COURSE, ERROR_EDIT_COURSE],
    promise: () => updateCourse(id, data),
    ...extra
  }
}

export const deleteCourse = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_COURSE, SUCCESS_DELETE_COURSE, ERROR_DELETE_COURSE],
    promise: () => removeCourse(id),
    ...extra
  }
}

export const searchCourse = (params, extra = {}) => {
  return {
    types: [
      LOADING_SEARCH_COURSES,
      SUCCESS_SEARCH_COURSES,
      ERROR_SEARCH_COURSES
    ],
    promise: () => listCourses(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
