import React, { createContext, Dispatch, Reducer, useReducer } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Gratitude } from './pages/Gratitude'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Homepage } from './pages/home-screens/Homepage'
import { SignUpPage } from './pages/home-screens/SignUpPage'
import { LoginPage } from './pages/home-screens/LoginPage'
import { AppReducer, ReducerProps } from './context/AppReducer'
import { Motivation } from './pages/Motivation'
import { Improvement } from './pages/Improvement'

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
              path='/gratitude'
              element={
                <Gratitude
                  title='gratitude'
                  theme='green'
                />
              }
            />
            <Route path='motivation'>
              <Route 
                path='' 
                element={
                  <Motivation
                    title='motivation'
                    theme='purple'
                  />
                }
              />
            </Route>
            <Route path='improvement'>
              <Route 
                path='' 
                element={
                  <Improvement
                    title='improvement'
                    theme='blue'
                  />
                }
              />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}