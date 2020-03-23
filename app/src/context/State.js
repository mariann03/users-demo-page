import { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import nextCookie from 'next-cookies'
import PropTypes from 'prop-types'
import { getUser, getUserProfile } from './actions'

const State = React.createContext()

function getInitialState(authToken) {
  return {
    authToken,
    user: { data: null, loading: !!authToken, error: '' },
    userProfile: { data: null, loading: !!authToken, error: '' },
    search: [],
    selectedUser: null
  }
}

export function useStateContext() {
  return useContext(State)
}

export default function StateProvider({ initialState, children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.authToken) return
    if (!state.user.data) getUser(dispatch)
    if (!state.userProfile.data) getUserProfile(dispatch)
  }, [state.authToken])

  return <State.Provider value={{ state, dispatch }}>{children}</State.Provider>
}

StateProvider.propTypes = {
  initialState: PropTypes.shape({ authToken: PropTypes.string, user: null, userProfile: null }),
  children: PropTypes.node
}

StateProvider.getInitialProps = ctx => {
  const { authToken } = nextCookie(ctx)
  return { initialState: getInitialState(authToken) }
}
