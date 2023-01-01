import React, { MouseEvent, useContext } from 'react'
import { AppContext } from '../App'

type BuildFormProps = {
  type: string
  name: string
  stack?: string
  label: string
  callback?: ( event: MouseEvent<HTMLButtonElement> ) => void
}

type Label = {
  label: string
}

type LabeledButton = Label & {
  callback?: any
}

const TextInputUnderLabel = ({ label }: Label ): JSX.Element => {
  return (
    <>
      <label className='form__label'>{ label }</label>
      <input className='form__main' type='text' />
    </>
  )
}

const FormButton = ({ label, callback } : LabeledButton ) => {
  const ctx: any = useContext( AppContext )
  return (
    <>
      <button onClick={ callback || null } className={ `form__button button-${ ctx.info.theme }` }>{ label }</button>
    </>
  )
}

export const useBuildForm = ( data: BuildFormProps[] ): JSX.Element => {
  const elements: any[] = []
  data.forEach( d => {
    switch( d.type ) {
      case 'text':
        elements.push( <TextInputUnderLabel label={ d.label } /> )
        break
      case 'button':
        elements.push( <FormButton label={ d.label } callback={ d.callback } /> )
      default:
        break
    }
  })
  return (
    <div className='form__container'>
      { elements && elements.map( e => e )}
    </div>
  )
}