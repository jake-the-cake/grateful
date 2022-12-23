import React from 'react'
import './App.css'
import { SubmitForm } from './components/SubmitForm'

export const App: () => JSX.Element = () => {
  return (
    <div className='page__container'>
      <div className='page__title--container'>
        <span className='page__title--text'>
          grateful.
        </span>
      </div>
      <SubmitForm
        label='I am grateful for'
        placeholder='Speak your mind...'
        cols={ 30 }
        rows={ 8 }
      />
    </div>
  )
}