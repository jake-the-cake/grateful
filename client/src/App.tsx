import React, { createContext, useReducer } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Grateful } from './pages/Grateful'
import { Footer } from './components/Footer'
import { Home, LoginPage, SignUpPage } from './pages/Home'
import { Homepage } from './pages/home-screens/Homepage'

export const AppContext: any = createContext({})

const AppReducer = ( state, action ) => {

  switch ( action.type ) {
    case 'SET-THEME':
      if ( !action.theme ) {
        console.error( 'no theme color provided' )
        return state
      }
      else {
        console.info( `Theme changed to '${ action.theme }'` );
        ( document.getElementById( 'menu' ) as HTMLDivElement ).classList.value = `menu__container menu-${ action.theme }`;
        ( document.getElementById( 'qg-link' ) as HTMLDivElement ).classList.value = `link-clean hover-${ action.theme }`;
        Array.from( document.getElementsByClassName( 'footer__link' )).forEach( link => {
          link.classList.value = `footer__link hover-${ action.theme }`;
        })
        state.theme = action.theme
        return state
      }
    case 'LOGIN-CHECK':
      if ( state.loginStatus === undefined ) {
        // check cookies
          /*
            need to build
          */
        // if not previously logged in
        state.loginStatus = false
      }
      return state
    case 'SET-URL':
      console.info( `URL changed to '${ action.url }'` )
      state.url = action.url
      return state
    default:
      return state
  }
}

export const App: () => JSX.Element = () => {
  const [ info, dispatch ] = useReducer( AppReducer, {
    url: undefined,
    theme: 'default',
    loginStatus: undefined,
    user: null
  })

  return (
    <div className='page__container'>
      <AppContext.Provider value={{ info, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path=''>
              <Route path='' element={ <Home element={ <Homepage /> }/> }/>
              <Route path='signup' element={ <Home element={ <SignUpPage /> } /> }/>
              <Route path='login' element={ <Home element={ <LoginPage /> } /> }/>
            </Route>
            <Route
              path='/grateful'
              element={
                <Grateful
                  title='grateful'
                  theme='green'
                />
              }
            />
            {/* <Route path='' element={} /> */}
            {/* <Route path='' element={} /> */}
          </Routes>
          {/* <Menu /> */}
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}