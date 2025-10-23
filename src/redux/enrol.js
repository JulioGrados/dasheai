import {
  listEnrols,
  listEnrolCertificates,
  ratingsEnrols,
  generalEnrols,
  createEnrol,
  detailEnrol,
  updateEnrol,
  updateEnrolMoodle,
  createShippingMoodle,
  removeEnrol
} from 'utils/api/enrols'

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
  general: [],
  all: [],
  add: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_ENROLS = 'LOADING_GET_ENROLS'
const SUCCESS_GET_ENROLS = 'SUCCESS_GET_ENROLS'
const ERROR_GET_ENROLS = 'ERROR_GET_ENROLS'

const LOADING_ENROLAGREE_CERTIFICATES = 'LOADING_ENROLAGREE_CERTIFICATES'
const SUCCESS_ENROLAGREE_CERTIFICATES = 'SUCCESS_ENROLAGREE_CERTIFICATES'
const ERROR_ENROLAGREE_CERTIFICATES = 'ERROR_ENROLAGREE_CERTIFICATES'

const LOADING_GET_GENERAL = 'LOADING_GET_GENERAL'
const SUCCESS_GET_GENERAL = 'SUCCESS_GET_GENERAL'
const ERROR_GET_GENERAL = 'ERROR_GET_GENERAL'

const LOADING_GET_RATINGS = 'LOADING_GET_RATINGS'
const SUCCESS_GET_RATINGS = 'SUCCESS_GET_RATINGS'
const ERROR_GET_RATINGS = 'ERROR_GET_RATINGS'

const LOADING_ADD_ENROL = 'LOADING_ADD_ENROL'
const SUCCESS_ADD_ENROL = 'SUCCESS_ADD_ENROL'
const ERROR_ADD_ENROL = 'ERROR_ADD_ENROL'

const LOADING_GET_ENROL = 'LOADING_GET_ENROL'
const SUCCESS_GET_ENROL = 'SUCCESS_GET_ENROL'
const ERROR_GET_ENROL = 'ERROR_GET_ENROL'

const LOADING_EDIT_ENROL = 'LOADING_EDIT_ENROL'
const SUCCESS_EDIT_ENROL = 'SUCCESS_EDIT_ENROL'
const ERROR_EDIT_ENROL = 'ERROR_EDIT_ENROL'

const LOADING_DELETE_ENROL = 'LOADING_DELETE_ENROL'
const SUCCESS_DELETE_ENROL = 'SUCCESS_DELETE_ENROL'
const ERROR_DELETE_ENROL = 'ERROR_DELETE_ENROL'

const LOADING_UPDATE_ENROLMOODLE = 'LOADING_UPDATE_ENROLMOODLE'
const SUCCESS_UPDATE_ENROLMOODLE = 'SUCCESS_UPDATE_ENROLMOODLE'
const ERROR_UPDATE_ENROLMOODLE = 'ERROR_UPDATE_ENROLMOODLE'

const LOADING_ADD_ENROLMOODLE = 'LOADING_ADD_ENROLMOODLE'
const SUCCESS_ADD_ENROLMOODLE = 'SUCCESS_ADD_ENROLMOODLE'
const ERROR_ADD_ENROLMOODLE = 'ERROR_ADD_ENROLMOODLE'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_ENROLS: {
      return loadingReducer(state)
    }
    case ERROR_GET_ENROLS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_ENROLS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // ENROLAGREE
    case LOADING_ENROLAGREE_CERTIFICATES: {
      return loadingReducer(state)
    }
    case ERROR_ENROLAGREE_CERTIFICATES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ENROLAGREE_CERTIFICATES: {
      return successReducer(state, {
        add: action.payload,
        loaded: true
      })
    }
    // GENERAL
    case LOADING_GET_RATINGS: {
      return loadingReducer(state)
    }
    case ERROR_GET_RATINGS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_RATINGS: {
      return successReducer(state, {
        general: action.payload,
        loaded: true
      })
    }
    // ALL
    case LOADING_GET_GENERAL: {
      return loadingReducer(state)
    }
    case ERROR_GET_GENERAL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_GENERAL: {
      return successReducer(state, {
        all: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_ENROL: {
      return loadingReducer(state)
    }
    case ERROR_ADD_ENROL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_ENROL: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }

    // CREATE MOODLE SHIPPING
    case LOADING_ADD_ENROLMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_ENROLMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_ENROLMOODLE: {
      return successReducer(state, {
        add: action.payload
      })
    }
    // DETAIL
    case LOADING_GET_ENROL: {
      return loadingReducer(state)
    }
    case ERROR_GET_ENROL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_ENROL: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_ENROL: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_ENROL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_ENROL: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // UPDATE MOODLE
    case LOADING_UPDATE_ENROLMOODLE: {
      return loadingReducer(state)
    }
    case ERROR_UPDATE_ENROLMOODLE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_UPDATE_ENROLMOODLE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_ENROL: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_ENROL: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_ENROL: {
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
export const getGeneralEnrols = (params, extra = {}) => {
  return {
    types: [LOADING_GET_ENROLS, SUCCESS_GET_ENROLS, ERROR_GET_ENROLS],
    promise: () => listEnrols({ query: { }, populate: ['course.ref', 'linked.ref'] }),
    ...extra
  }
}

export const getEnrols = (params, extra = {}) => {
  return {
    types: [LOADING_GET_ENROLS, SUCCESS_GET_ENROLS, ERROR_GET_ENROLS],
    promise: () => listEnrols(params),
    ...extra
  }
}

export const getRatings = (params, extra = {}) => {
  return {
    types: [LOADING_GET_RATINGS, SUCCESS_GET_RATINGS, ERROR_GET_RATINGS],
    promise: () => ratingsEnrols(params),
    ...extra
  }
}

export const getGeneral = (params, extra = {}) => {
  return {
    types: [LOADING_GET_GENERAL, SUCCESS_GET_GENERAL, ERROR_GET_GENERAL],
    promise: () => generalEnrols(params),
    ...extra
  }
}

export const listEnrolAgreements = (params) => {
  return {
    types: [
      LOADING_ENROLAGREE_CERTIFICATES,
      SUCCESS_ENROLAGREE_CERTIFICATES,
      ERROR_ENROLAGREE_CERTIFICATES
    ],
    promise: () => listEnrolCertificates(params)
  }
}

export const addEnrol = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_ENROL, SUCCESS_ADD_ENROL, ERROR_ADD_ENROL],
    promise: () => createEnrol(data),
    ...extra
  }
}

export const getEnrol = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_ENROL, SUCCESS_GET_ENROL, ERROR_GET_ENROL],
    promise: () => detailEnrol(id, params),
    ...extra
  }
}

export const editEnrol = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_ENROL, SUCCESS_EDIT_ENROL, ERROR_EDIT_ENROL],
    promise: () => updateEnrol(id, data),
    ...extra
  }
}

export const addShippingsMoodle = (data, extra = {}) => {
  return {
    types: [
      LOADING_ADD_ENROLMOODLE,
      SUCCESS_ADD_ENROLMOODLE,
      ERROR_ADD_ENROLMOODLE
    ],
    promise: () => createShippingMoodle(data),
    ...extra
  }
}

export const updateGradeMoodle = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_ENROL, SUCCESS_EDIT_ENROL, ERROR_EDIT_ENROL],
    promise: () => updateEnrolMoodle(id, data),
    ...extra
  }
}

export const deleteEnrol = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_ENROL, SUCCESS_DELETE_ENROL, ERROR_DELETE_ENROL],
    promise: () => removeEnrol(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
