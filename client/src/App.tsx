import React, { createContext, Dispatch, Reducer, useReducer } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Grateful } from './pages/Grateful'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Homepage } from './pages/home-screens/Homepage'
import { SignUpPage } from './pages/home-screens/SignUpPage'
import { LoginPage } from './pages/home-screens/LoginPage'
import { AppReducer, ReducerProps } from './context/AppReducer'

export const AppContext: any = createContext({})

export const App: () => JSX.Element = () => {
  const [ info, dispatch ] = useReducer<Reducer<ReducerProps, Dispatch<ReducerProps>>>( AppReducer, {
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
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}