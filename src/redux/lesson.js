import {
  listLessons,
  createLesson,
  createLessonMoodle,
  detailLesson,
  updateLesson,
  removeLesson
} from 'utils/api/lessons'

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
  newLessons: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_LESSONS = 'LOADING_GET_LESSONS'
const SUCCESS_GET_LESSONS = 'SUCCESS_GET_LESSONS'
const ERROR_GET_LESSONS = 'ERROR_GET_LESSONS'

const LOADING_ADD_LESSON = 'LOADING_ADD_LESSON'
const SUCCESS_ADD_LESSON = 'SUCCESS_ADD_LESSON'
const ERROR_ADD_LESSON = 'ERROR_ADD_LESSON'

const LOADING_GET_LESSON = 'LOADING_GET_LESSON'
const SUCCESS_GET_LESSON = 'SUCCESS_GET_LESSON'
const ERROR_GET_LESSON = 'ERROR_GET_LESSON'

const LOADING_EDIT_LESSON = 'LOADING_EDIT_LESSON'
const SUCCESS_EDIT_LESSON = 'SUCCESS_EDIT_LESSON'
const ERROR_EDIT_LESSON = 'ERROR_EDIT_LESSON'

const LOADING_DELETE_LESSON = 'LOADING_DELETE_LESSON'
const SUCCESS_DELETE_LESSON = 'SUCCESS_DELETE_LESSON'
const ERROR_DELETE_LESSON = 'ERROR_DELETE_LESSON'

const LOADING_ADD_LESSONMOODLE = 'LOADING_ADD_LESSONMOODLE'
const SUCCESS_ADD_LESSONMOODLE = 'SUCCESS_ADD_LESSONMOODLE'
const ERROR_ADD_LESSONMOODLE = 'ERROR_ADD_LESSONMOODLE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_LESSONS: {
      return loadingReducer(state)
    }
    case ERROR_GET_LESSONS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_LESSONS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_LESSON: {
      return loadingReducer(state)
    }
    case ERROR_ADD_LESSON: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_LESSON: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }

    // CREATE MOODLE
    case LOADING_ADD_LESSONMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_LESSONMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_LESSONMOODLE: {
      return successReducer(state, {
        newLessons: action.payload
      })
    }
    // DETAIL
    case LOADING_GET_LESSON: {
      return loadingReducer(state)
    }
    case ERROR_GET_LESSON: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_LESSON: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_LESSON: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_LESSON: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_LESSON: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_LESSON: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_LESSON: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_LESSON: {
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
export const getLessons = (params, extra = {}) => {
  return {
    types: [LOADING_GET_LESSONS, SUCCESS_GET_LESSONS, ERROR_GET_LESSONS],
    promise: () => listLessons(params),
    ...extra
  }
}

export const addLesson = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_LESSON, SUCCESS_ADD_LESSON, ERROR_ADD_LESSON],
    promise: () => createLesson(data),
    ...extra
  }
}

export const addLessonsMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_LESSONMOODLE,
      SUCCESS_ADD_LESSONMOODLE,
      ERROR_ADD_LESSONMOODLE
    ],
    promise: () => createLessonMoodle(data),
    ...extra
  }
}

export const getLesson = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_LESSON, SUCCESS_GET_LESSON, ERROR_GET_LESSON],
    promise: () => detailLesson(id, params),
    ...extra
  }
}

export const editLesson = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_LESSON, SUCCESS_EDIT_LESSON, ERROR_EDIT_LESSON],
    promise: () => updateLesson(id, data),
    ...extra
  }
}

export const deleteLesson = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_LESSON, SUCCESS_DELETE_LESSON, ERROR_DELETE_LESSON],
    promise: () => removeLesson(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
