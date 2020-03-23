import Cookies from 'js-cookie'
import Axios from 'axios'
import Router from 'next/router'

import { SIGN_IN, SIGN_OUT, GET_USER, GET_USER_PROFILE, SEARCH_USERS, SELECT_USER, UPDATE_PROFILE } from './types'

export async function singIn(dispatch, payload) {
  dispatch({ type: SIGN_IN, payload })
  Cookies.set('authToken', payload, { expires: 1 })

  if (!(await getUser(dispatch))) return
  if (!(await getUserProfile(dispatch))) return

  Router.push('/')
}

export function singOut(dispatch) {
  dispatch({ type: SIGN_OUT })
  Cookies.remove('authToken')
  Router.push('/')
}

export async function getUser(dispatch) {
  dispatch({ type: GET_USER, payload: { data: null, loading: true, error: '' } })
  const authorization = Cookies.get('authToken')

  try {
    const response = await Axios.get('/api/user', { headers: { authorization } })
    dispatch({ type: GET_USER, payload: { data: response.data, loading: false, error: '' } })
    return true
  } catch ({ response }) {
    if (response.status === 401) Router.push('/signin')
    dispatch({ type: GET_USER, payload: { data: null, loading: false, error: response.data } })
    return false
  }
}

export async function getUserProfile(dispatch) {
  dispatch({ type: GET_USER_PROFILE, payload: { data: null, loading: true, error: '' } })
  const authorization = Cookies.get('authToken')

  try {
    const response = await Axios.get('/api/user/profile', { headers: { authorization } })
    dispatch({ type: GET_USER_PROFILE, payload: { data: response.data, loading: false, error: '' } })
    return true
  } catch ({ response }) {
    if (status === 401) Router.push('/signin')
    if (Router.pathname !== '/profile' && response.status === 404) {
      Router.push('/profile')
    }
    dispatch({ type: GET_USER_PROFILE, payload: { data: null, loading: false, error: response.data } })
    return false
  }
}

export function updateProfile(dispatch, payload) {
  dispatch({ type: UPDATE_PROFILE, payload })
}

export async function searchUsers(dispatch, searchTerm) {
  dispatch({ type: SEARCH_USERS, payload: { data: null, loading: true, erorr: '' } })
  const authorization = Cookies.get('authToken')

  try {
    const response = await Axios.get(`/api/users?${searchTerm}`, { headers: { authorization } })
    dispatch({ type: SEARCH_USERS, payload: { data: response.data, loading: false, error: '' } })
  } catch ({ response }) {
    if (response.status === 403) Router.push('/')
    dispatch({ type: SEARCH_USERS, payload: { data: [], loading: false, error: response.data } })
  }
}

export function selectUser(dispatch, payload) {
  dispatch({ type: SELECT_USER, payload })
}
