import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { appSettings } from '../data/appSettings'
import { handleFirstSubmit, handleSubmitToApi } from '../handlers/handleAdd'
import { loadPageSettings } from '../hooks/UseSetPageProps'

type SubmitFormProps = ( props: {
    label: string,
    placeholder: string,
    cols?: number,
    rows?: number,
  }) => JSX.Element

export const SubmitForm: SubmitFormProps = ({ label, placeholder, cols, rows }) => {
  const ctx: any = useContext( AppContext )
  const thisPage: any = loadPageSettings()
  const [ tryAgain, setTryAgain ] = useState( false )
  console.log( ctx )
  console.log( thisPage )
  return (
    <form className='form__container'>
      {
        tryAgain
        ? (
          <>
            <span
              className='form__label'
            >{ thisPage.page?.tryAgain ?? 'No tryAgain setting.' }</span>
            <button
              onClick={() => setTryAgain( false )}
              className={ `form__button button-${ thisPage.theme }` }
            >Actually, There Is!</button>
            <button
              onClick={( e ) => handleSubmitToApi( e, '', ctx.info )}
              className='form__button form__button--secondary'
            >I'm Sure</button>
          </>
        )
        : (
        <>
          <label htmlFor='grateful' className='form__label'>{ label }</label>
          <textarea name="grateful" className='form__main' id="grateful" cols={ cols || 30 } rows={ rows || 4 } placeholder={ placeholder }></textarea>
          <button onClick={( e ) => handleFirstSubmit( e, setTryAgain, ctx.info) } className={`form__button button-${ thisPage.theme }`}>Add</button>
        </>
        )
      }
    </form>
  )
}