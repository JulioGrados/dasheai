import {
  listUsers,
  createUser,
  createUsersMoodle,
  createGradesMoodle,
  createEvaluationsMoodle,
  createEnrolsMoodle,
  createCertificatesMoodle,
  detailUser,
  updateUser,
  updateDeleteDNI,
  updateDeleteAccount,
  updateDeleteAccountMoodle,
  removeUser,
  updateDeletePhoto
} from 'utils/api/users'
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
  newUsers: [],
  newGrades: [],
  newEvaluations: [],
  newEnrols: [],
  newCertificates: [],
  temp: [],
  assessors: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_USERS = 'LOADING_GET_USERS'
const SUCCESS_GET_USERS = 'SUCCESS_GET_USERS'
const ERROR_GET_USERS = 'ERROR_GET_USERS'

const LOADING_SEARCH_USERS = 'LOADING_SEARCH_USERS'
const SUCCESS_SEARCH_USERS = 'SUCCESS_SEARCH_USERS'
const ERROR_SEARCH_USERS = 'ERROR_SEARCH_USERS'

const LOADING_ADD_USER = 'LOADING_ADD_USER'
const SUCCESS_ADD_USER = 'SUCCESS_ADD_USER'
const ERROR_ADD_USER = 'ERROR_ADD_USER'

const LOADING_GET_USER = 'LOADING_GET_USER'
const SUCCESS_GET_USER = 'SUCCESS_GET_USER'
const ERROR_GET_USER = 'ERROR_GET_USER'

const LOADING_EDIT_USER = 'LOADING_EDIT_USER'
const SUCCESS_EDIT_USER = 'SUCCESS_EDIT_USER'
const ERROR_EDIT_USER = 'ERROR_EDIT_USER'

const LOADING_DELETE_USER = 'LOADING_DELETE_USER'
const SUCCESS_DELETE_USER = 'SUCCESS_DELETE_USER'
const ERROR_DELETE_USER = 'ERROR_DELETE_USER'

const LOADING_GET_ASSESSORS = 'LOADING_GET_ASSESSORS'
const SUCCESS_GET_ASSESSORS = 'SUCCESS_GET_ASSESSORS'
const ERROR_GET_ASSESSORS = 'ERROR_GET_ASSESSORS'

const LOADING_ADD_USERSMOODLE = 'LOADING_ADD_USERSMOODLE'
const SUCCESS_ADD_USERSMOODLE = 'SUCCESS_ADD_USERSMOODLE'
const ERROR_ADD_USERSMOODLE = 'ERROR_ADD_USERSMOODLE'

const LOADING_ADD_GRADESMOODLE = 'LOADING_ADD_GRADESMOODLE'
const SUCCESS_ADD_GRADESMOODLE = 'SUCCESS_ADD_GRADESMOODLE'
const ERROR_ADD_GRADESMOODLE = 'ERROR_ADD_GRADESMOODLE'

const LOADING_ADD_EVALUATIONSMOODLE = 'LOADING_ADD_EVALUATIONSMOODLE'
const SUCCESS_ADD_EVALUATIONSMOODLE = 'SUCCESS_ADD_EVALUATIONSMOODLE'
const ERROR_ADD_EVALUATIONSMOODLE = 'ERROR_ADD_EVALUATIONSMOODLE'

const LOADING_ADD_ENROLSMOODLE = 'LOADING_ADD_ENROLSMOODLE'
const SUCCESS_ADD_ENROLSMOODLE = 'SUCCESS_ADD_ENROLSMOODLE'
const ERROR_ADD_ENROLSMOODLE = 'ERROR_ADD_ENROLSMOODLE'

const LOADING_ADD_CERTIFICATESMOODLE = 'LOADING_ADD_CERTIFICATESMOODLE'
const SUCCESS_ADD_CERTIFICATESMOODLE = 'SUCCESS_ADD_CERTIFICATESMOODLE'
const ERROR_ADD_CERTIFICATESMOODLE = 'ERROR_ADD_CERTIFICATESMOODLE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_USERS: {
      return loadingReducer(state)
    }
    case ERROR_GET_USERS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_USERS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // SEARCH
    case LOADING_SEARCH_USERS: {
      return loadingReducer(state)
    }
    case ERROR_SEARCH_USERS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SEARCH_USERS: {
      return successReducer(state, {
        temp: action.payload
      })
    }
    // CREATE
    case LOADING_ADD_USER: {
      return loadingReducer(state)
    }
    case ERROR_ADD_USER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_USER: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // CREATE MOODLE
    case LOADING_ADD_USERSMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_USERSMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_USERSMOODLE: {
      return successReducer(state, {
        newUsers: action.payload
      })
    }
    // GRADE MOODLE
    case LOADING_ADD_GRADESMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_GRADESMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_GRADESMOODLE: {
      return successReducer(state, {
        newGrades: action.payload
      })
    }
    // CERTIFICATES MOODLE
    case LOADING_ADD_CERTIFICATESMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CERTIFICATESMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CERTIFICATESMOODLE: {
      return successReducer(state, {
        newCertificates: action.payload
      })
    }
    // EVALUATIONS MOODLE
    case LOADING_ADD_EVALUATIONSMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_EVALUATIONSMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_EVALUATIONSMOODLE: {
      return successReducer(state, {
        newEvaluations: action.payload
      })
    }
    // ENROLS MOODLE
    case LOADING_ADD_ENROLSMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_ENROLSMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_ENROLSMOODLE: {
      return successReducer(state, {
        newEnrols: action.payload
      })
    }
    // DETAIL
    case LOADING_GET_USER: {
      return loadingReducer(state)
    }
    case ERROR_GET_USER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_USER: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_USER: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_USER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_USER: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }

    // ASSESORS
    case LOADING_GET_ASSESSORS: {
      return loadingReducer(state)
    }
    case ERROR_GET_ASSESSORS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_ASSESSORS: {
      return successReducer(state, {
        assessors: action.payload,
        loaded: true
      })
    }
    // DELETE
    case LOADING_DELETE_USER: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_USER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_USER: {
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
export const getUsers = (params, extra = {}) => {
  return {
    types: [LOADING_GET_USERS, SUCCESS_GET_USERS, ERROR_GET_USERS],
    promise: () => listUsers(params),
    ...extra
  }
}

export const getAssessors = (params, extra = {}) => {
  return {
    types: [LOADING_GET_ASSESSORS, SUCCESS_GET_ASSESSORS, ERROR_GET_ASSESSORS],
    promise: () => listUsers(params),
    ...extra
  }
}

export const addUser = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_USER, SUCCESS_ADD_USER, ERROR_ADD_USER],
    promise: () => createUser(data),
    ...extra
  }
}

export const addUsersMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_USERSMOODLE,
      SUCCESS_ADD_USERSMOODLE,
      ERROR_ADD_USERSMOODLE
    ],
    promise: () => createUsersMoodle(data),
    ...extra
  }
}

export const addGradeMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_GRADESMOODLE,
      SUCCESS_ADD_GRADESMOODLE,
      ERROR_ADD_GRADESMOODLE
    ],
    promise: () => createGradesMoodle(data),
    ...extra
  }
}

export const addEnrolsMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_ENROLSMOODLE,
      SUCCESS_ADD_ENROLSMOODLE,
      ERROR_ADD_ENROLSMOODLE
    ],
    promise: () => createEnrolsMoodle(data),
    ...extra
  }
}

export const addCertificatesMoodle = (data, extra = {}) => {
  console.log('data certisss', data)
  return {
    types: [
      LOADING_ADD_CERTIFICATESMOODLE,
      SUCCESS_ADD_CERTIFICATESMOODLE,
      ERROR_ADD_CERTIFICATESMOODLE
    ],
    promise: () => createCertificatesMoodle(data),
    ...extra
  }
}

export const addEvaluationsMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_EVALUATIONSMOODLE,
      SUCCESS_ADD_EVALUATIONSMOODLE,
      ERROR_ADD_EVALUATIONSMOODLE
    ],
    promise: () => createEvaluationsMoodle(data),
    ...extra
  }
}

export const getUser = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_USER, SUCCESS_GET_USER, ERROR_GET_USER],
    promise: () => detailUser(id, params),
    ...extra
  }
}

export const editUser = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_USER, SUCCESS_EDIT_USER, ERROR_EDIT_USER],
    promise: () => updateUser(id, data),
    ...extra
  }
}

export const deleteDniUser = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_USER, SUCCESS_EDIT_USER, ERROR_EDIT_USER],
    promise: () => updateDeleteDNI(id, data),
    ...extra
  }
}

export const deleteAccountUser = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_USER, SUCCESS_EDIT_USER, ERROR_EDIT_USER],
    promise: () => updateDeleteAccount(id, data),
    ...extra
  }
}

export const deleteAccountUserMoodle = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_USER, SUCCESS_EDIT_USER, ERROR_EDIT_USER],
    promise: () => updateDeleteAccountMoodle(id, data),
    ...extra
  }
}

export const deletePhotoUser = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_USER, SUCCESS_EDIT_USER, ERROR_EDIT_USER],
    promise: () => updateDeletePhoto(id, data),
    ...extra
  }
}

export const deleteUser = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_USER, SUCCESS_DELETE_USER, ERROR_DELETE_USER],
    promise: () => removeUser(id),
    ...extra
  }
}

export const searchUser = (params, extra = {}) => {
  return {
    types: [LOADING_SEARCH_USERS, SUCCESS_SEARCH_USERS, ERROR_SEARCH_USERS],
    promise: () => listUsers(params),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
