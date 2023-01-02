import React, { MouseEvent, useContext } from 'react'
import { AppContext } from '../App'

type BuildFormProps = {
  type: string
  name: string
  stack?: string
  label: string
  callback?: ( event: MouseEvent<HTMLButtonElement> ) => void
}

type Labelled = {
  label: string
  name: string
}

type LabeledButton = Labelled & {
  callback?: any
}

const TextInputUnderLabel = ({ label, name, errors }: Labelled & { errors: any } ): JSX.Element => {
  return (
    <>
      <label
        htmlFor={ name }
        className='form__label'
      >
        { label }
      </label>
      <input
        id={ name }
        className='form__main'
        type='text'
      />
      { errors && errors[ name ]}
    </>
  )
}

const FormButton = ({ label, callback } : LabeledButton ) => {
  const ctx: any = useContext( AppContext )
  return (
    <button
      onClick={ callback || null }
      className={ `form__button button-${ ctx.info.theme }` }
    >
      { label }
    </button>
  )
}

export const useBuildForm = ( data: BuildFormProps[], errors: any ): JSX.Element => {
  const elements: any[] = []
  data.forEach( d => {
    switch( d.type ) {
      case 'text':
        elements.push(
          <TextInputUnderLabel
            label={ d.label }
            name={ d.name }
            errors={ errors }
          /> )
        break
      case 'button':
        elements.push(
          <FormButton
            label={ d.label }
            name={ d.name }
            callback={ d.callback }
          /> )
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