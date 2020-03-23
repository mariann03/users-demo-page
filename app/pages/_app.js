import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Nav from '../src/components/Nav'
import StateProvider from '../src/context/State'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const stateProviderProps = StateProvider.getInitialProps(ctx)

    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { stateProviderProps, pageProps }
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, stateProviderProps } = this.props
    return (
      <>
        <Head>
          <title>My page</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <StateProvider {...stateProviderProps}>
            <CssBaseline />
            <Nav />
            <Component {...pageProps} />
          </StateProvider>
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
