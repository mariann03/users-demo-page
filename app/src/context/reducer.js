import { SIGN_IN, SIGN_OUT, GET_USER, GET_USER_PROFILE, UPDATE_PROFILE, SEARCH_USERS, SELECT_USER } from './types'

const QUERY_DEFAULT_STATE = { data: null, loading: false, error: '' }

export default function reducer(state, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, authToken: action.payload }
    case SIGN_OUT:
      return { ...state, authToken: null, user: QUERY_DEFAULT_STATE, userProfile: QUERY_DEFAULT_STATE }
    case GET_USER:
      return { ...state, user: action.payload }
    case GET_USER_PROFILE:
      return { ...state, userProfile: action.payload }
    case UPDATE_PROFILE:
      return { ...state, userProfile: { ...QUERY_DEFAULT_STATE, data: action.payload } }
    case SEARCH_USERS:
      return { ...state, search: action.payload }
    case SELECT_USER:
      return { ...state, selectedUser: action.payload }
    default:
      throw new Error('Unknown type')
  }
}
