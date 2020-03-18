import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Nav from '../src/components/Nav'
import SessionManager from '../src/contexts/SessionManager'
import User from '../src/contexts/User'
import UserProfile from '../src/contexts/UserProfile'
import SelectedUser from '../src/contexts/SelectedUser'
import Search from '../src/contexts/Search'

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>My page</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <SessionManager.Provider>
            <User.Provider>
              <UserProfile.Provider>
                <Search.Provider>
                  <SelectedUser.Provider>
                    <CssBaseline />
                    <Nav />
                    <Component {...pageProps} />
                  </SelectedUser.Provider>
                </Search.Provider>
              </UserProfile.Provider>
            </User.Provider>
          </SessionManager.Provider>
        </ThemeProvider>
        <style jsx global>{`
          a {
            cursor: pointer;
          }
          svg {
            vertical-align: top;
          }
          .navStyles: {
            margin-left: auto,
            display: flex,
            align-items: center
          }
        `}</style>
      </>
    )
  }
}
