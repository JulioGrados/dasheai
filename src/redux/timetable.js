import {
  listTimetables,
  createTimetable,
  detailTimetable,
  updateTimetable,
  removeTimetable
} from 'utils/api/timetable'

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

const LOADING_GET_TIMETABLES = 'LOADING_GET_TIMETABLES'
const SUCCESS_GET_TIMETABLES = 'SUCCESS_GET_TIMETABLES'
const ERROR_GET_TIMETABLES = 'ERROR_GET_TIMETABLES'

const LOADING_ADD_TIMETABLE = 'LOADING_ADD_TIMETABLE'
const SUCCESS_ADD_TIMETABLE = 'SUCCESS_ADD_TIMETABLE'
const ERROR_ADD_TIMETABLE = 'ERROR_ADD_TIMETABLE'

const LOADING_GET_TIMETABLE = 'LOADING_GET_TIMETABLE'
const SUCCESS_GET_TIMETABLE = 'SUCCESS_GET_TIMETABLE'
const ERROR_GET_TIMETABLE = 'ERROR_GET_TIMETABLE'

const LOADING_EDIT_TIMETABLE = 'LOADING_EDIT_TIMETABLE'
const SUCCESS_EDIT_TIMETABLE = 'SUCCESS_EDIT_TIMETABLE'
const ERROR_EDIT_TIMETABLE = 'ERROR_EDIT_TIMETABLE'

const LOADING_DELETE_TIMETABLE = 'LOADING_DELETE_TIMETABLE'
const SUCCESS_DELETE_TIMETABLE = 'SUCCESS_DELETE_TIMETABLE'
const ERROR_DELETE_TIMETABLE = 'ERROR_DELETE_TIMETABLE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_TIMETABLES: {
      return loadingReducer(state)
    }
    case ERROR_GET_TIMETABLES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_TIMETABLES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_TIMETABLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_TIMETABLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_TIMETABLE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_TIMETABLE: {
      return loadingReducer(state)
    }
    case ERROR_GET_TIMETABLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_TIMETABLE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_TIMETABLE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_TIMETABLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_TIMETABLE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_TIMETABLE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_TIMETABLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_TIMETABLE: {
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
export const getTimetables = (params, extra = {}) => {
  return {
    types: [LOADING_GET_TIMETABLES, SUCCESS_GET_TIMETABLES, ERROR_GET_TIMETABLES],
    promise: () => listTimetables(params),
    ...extra
  }
}

export const addTimetable = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_TIMETABLE, SUCCESS_ADD_TIMETABLE, ERROR_ADD_TIMETABLE],
    promise: () => createTimetable(data),
    ...extra
  }
}

export const getTimetable = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_TIMETABLE, SUCCESS_GET_TIMETABLE, ERROR_GET_TIMETABLE],
    promise: () => detailTimetable(id, params),
    ...extra
  }
}

export const editTimetable = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_TIMETABLE, SUCCESS_EDIT_TIMETABLE, ERROR_EDIT_TIMETABLE],
    promise: () => updateTimetable(id, data),
    ...extra
  }
}

export const deleteTimetable = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_TIMETABLE,
      SUCCESS_DELETE_TIMETABLE,
      ERROR_DELETE_TIMETABLE
    ],
    promise: () => removeTimetable(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
