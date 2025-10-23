import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createMiddleware from './middleware'

import auth, { getAuthUser } from './auth'
import log from './log'
import sale from './sale'
import user from './user'
import email from './email'
import course from './course'
import voucher from './voucher'
import whatsapp from './whatsapp'
import progress from './progress'
import template from './template'
import category from './category'
import agreement from './agreement'
import call from './call'
import receipt from './receipt'
import contact from './contact'
import payment from './payment'
import meta from './meta'
import label from './label'
import certificate from './certificate'
import enrol from './enrol'
import deal from './deal'
import company from './company'
import testimony from './testimony'
import lesson from './lesson'
import claim from './claim'
import order from './order'
import migration from './migration'
import timetable from './timetable'
import charge from './charge'

const reducers = combineReducers({
  log,
  auth,
  user,
  sale,
  email,
  course,
  progress,
  template,
  category,
  agreement,
  whatsapp,
  voucher,
  call,
  receipt,
  contact,
  payment,
  meta,
  label,
  enrol,
  deal,
  certificate,
  testimony,
  company,
  lesson,
  claim,
  order,
  migration,
  timetable,
  charge
})

const middleware = [createMiddleware, thunk]

export const initStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  getAuthUser()(store.dispatch)
  return store
}
