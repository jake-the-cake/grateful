import React, { useState } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { loadPageSettings } from '../hooks/UseSetPageProps'

type SubmitFormProps = ( props: {
    label: string,
    placeholder: string,
    cols?: number,
    rows?: number,
    theme: string
  }) => JSX.Element

export const SubmitForm: SubmitFormProps = ({ label, placeholder, cols, rows, theme }) => {
  const thisPage: any = loadPageSettings()
  const [ errorMessage, setErrorMessage ] = useState( '' )

  const handleSumbitItem = ( event: any, item: string ) => {
    event.preventDefault()
    useFetch( 'POST', '/gratitude/add', {
      body: {
        user: 'testuser',
        note: item
      }
    })
    .then( d => d.json() )
    .then( d => console.log( d ))
    .catch(( error ) => console.error( error.message ))
  }

  const handleAddItem = ( event: any ) => {
    event.preventDefault()
    // pull text area value
    const gratefulFor = ( document.getElementById( 'grateful' ) as HTMLTextAreaElement ).value
    // check for empty form
    if ( !gratefulFor ) {
      setErrorMessage( 'Are you sure that there isn\'t something that you are grateful for right now?' )
    }
    else {
      handleSumbitItem( event, gratefulFor )
    }
  }

  return (
    <form className='form__container'>
      {
        errorMessage
        ? (
          <>
          <span className='form__label'>{ errorMessage }</span>
          <button onClick={ () => setErrorMessage( '' )} className='form__button'>Actually, There Is!</button>
          <button onClick={ ( e ) => handleSumbitItem( e, '' ) } className='form__button form__button--secondary'>I'm Sure</button>
          </>
        )
        : (
        <>
          <label htmlFor='grateful' className='form__label'>{ label }</label>
          <textarea name="grateful" className='form__main' id="grateful" cols={ cols || 30 } rows={ rows || 4 } placeholder={ placeholder }></textarea>
          <button onClick={ handleAddItem } className={`form__button button-${ thisPage.theme }`}>Add</button>
        </>
        )
      }
    </form>
  )
}