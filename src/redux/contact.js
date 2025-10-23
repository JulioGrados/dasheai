import {
  listContacts,
  createContact,
  detailContact,
  updateContact,
  removeContact
} from 'utils/api/contacts'

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

const LOADING_GET_CONTACTS = 'LOADING_GET_CONTACTS'
const SUCCESS_GET_CONTACTS = 'SUCCESS_GET_CONTACTS'
const ERROR_GET_CONTACTS = 'ERROR_GET_CONTACTS'

const LOADING_ADD_CONTACT = 'LOADING_ADD_CONTACT'
const SUCCESS_ADD_CONTACT = 'SUCCESS_ADD_CONTACT'
const ERROR_ADD_CONTACT = 'ERROR_ADD_CONTACT'

const LOADING_GET_CONTACT = 'LOADING_GET_CONTACT'
const SUCCESS_GET_CONTACT = 'SUCCESS_GET_CONTACT'
const ERROR_GET_CONTACT = 'ERROR_GET_CONTACT'

const LOADING_EDIT_CONTACT = 'LOADING_EDIT_CONTACT'
const SUCCESS_EDIT_CONTACT = 'SUCCESS_EDIT_CONTACT'
const ERROR_EDIT_CONTACT = 'ERROR_EDIT_CONTACT'

const LOADING_DELETE_CONTACT = 'LOADING_DELETE_CONTACT'
const SUCCESS_DELETE_CONTACT = 'SUCCESS_DELETE_CONTACT'
const ERROR_DELETE_CONTACT = 'ERROR_DELETE_CONTACT'

const RELOAD_STATE = 'RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CONTACTS: {
      return loadingReducer(state)
    }
    case ERROR_GET_CONTACTS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CONTACTS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CONTACT: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CONTACT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CONTACT: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CONTACT: {
      return loadingReducer(state)
    }
    case ERROR_GET_CONTACT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CONTACT: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CONTACT: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CONTACT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CONTACT: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CONTACT: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CONTACT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CONTACT: {
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
export const getContacts = (params, extra = {}) => {
  return {
    types: [LOADING_GET_CONTACTS, SUCCESS_GET_CONTACTS, ERROR_GET_CONTACTS],
    promise: () => listContacts(params),
    ...extra
  }
}

export const addContact = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CONTACT, SUCCESS_ADD_CONTACT, ERROR_ADD_CONTACT],
    promise: () => createContact(data),
    ...extra
  }
}

export const getContact = (id, params, extra = {}) => {
  return {
    types: [LOADING_GET_CONTACT, SUCCESS_GET_CONTACT, ERROR_GET_CONTACT],
    promise: () => detailContact(id, params),
    ...extra
  }
}

export const editContact = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CONTACT, SUCCESS_EDIT_CONTACT, ERROR_EDIT_CONTACT],
    promise: () => updateContact(id, data),
    ...extra
  }
}

export const deleteContact = (id, extra = {}) => {
  return {
    types: [
      LOADING_DELETE_CONTACT,
      SUCCESS_DELETE_CONTACT,
      ERROR_DELETE_CONTACT
    ],
    promise: () => removeContact(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
