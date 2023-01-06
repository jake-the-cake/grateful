import React, { MouseEvent, useContext } from 'react'
import { AppContext } from '../App'

export type BuildFormProps = {
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

const TextInputUnderLabel = ({ label, name, errors, type, k }: Labelled & { errors: any, type: string, k: number } ): JSX.Element => {
  return (
    <>
      <label
        key={ `label${ k }` }
        htmlFor={ name }
        className='form__label'
      >
        { label }
      </label>
      <input
        key={ `input${ k }` }
        id={ name }
        className='form__main'
        type={ type }
      />
      { errors && (
        <div className='form__error' key={ `error${ k }` }>
          { errors[ name ] } 
        </div>
      )}
    </>
  )
}

const FormButton = ({ label, callback, k } : LabeledButton & { k: number } ) => {
  const ctx: any = useContext( AppContext )
  return (
    <button
      key={ `button${ k }` }
      onClick={ callback || null }
      className={ `form__button button-${ ctx.info.theme }` }
    >
      { label }
    </button>
  )
}

export const useBuildForm = ( data: BuildFormProps[], errors: any ): any[] => {
  const elements: any[] = []
  data.forEach(( d, index: number ) => {
    switch( d.type ) {
      case 'text':
        elements.push(
          <TextInputUnderLabel
            key={ `formelement${ index }`}
            k={ index }
            label={ d.label }
            name={ d.name }
            errors={ errors }
            type='text'
          /> )
        break
      case 'password':
        elements.push(
          <TextInputUnderLabel
            key={ `formelement${ index }`}
            k={ index }
            label={ d.label }
            name={ d.name }
            errors={ errors }
            type='password'
          /> )
        break
      case 'button':
        elements.push(
          <FormButton
            key={ `formelement${ index }`}
            k={ index }
            label={ d.label }
            name={ d.name }
            callback={ d.callback }
          /> )
      default:
        break
    }
  })
  return elements
}