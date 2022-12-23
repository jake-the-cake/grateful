import React, { useState } from 'react'

type SubmitFormProps = ( props: {
    label: string,
    placeholder: string,
    cols?: number,
    rows?: number
  }) => JSX.Element

export const SubmitForm: SubmitFormProps = ({ label, placeholder, cols, rows }) => {
  const [ errorMessage, setErrorMessage ] = useState( '' )

  const handleSumbitItem = ( event: any, item: string ) => {
    event.preventDefault()
    console.log( 'add: ' + item)
  }

  const handleAddItem = ( event: any ) => {
    event.preventDefault()
    const gratefulFor = ( document.getElementById( 'grateful' ) as HTMLTextAreaElement ).value
    if ( !gratefulFor && !errorMessage ) {
      console.log( 'you didn\'t write anything' )
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
          <button onClick={ handleAddItem } className='form__button'>Add</button>
        </>
        )
      }
    </form>
  )
}