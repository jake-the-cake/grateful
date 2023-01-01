import React, { MouseEvent, ReactNode, useContext } from 'react'
import { AppContext } from '../App'
import { Menu } from '../components/Menu'
import { PageTitle, PAGE_TITLE_ARROWS } from '../components/PageTitle'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  title?: string
  theme?: string
  element?: JSX.Element
}

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


const TextInputUnderLabel = ({ label }: Label ) => {
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

const useBuildForm = ( data: BuildFormProps[] ): JSX.Element => {
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

export const SignUpPage = () => {
  return (
    <>
      Sign up page
    </>
  )
}

export const LoginPage = () => {
  return useBuildForm([
    {
      type: 'text',
      name: 'email',
      stack: 'vertical',
      label: 'Email Address',
    },{
      type: 'text',
      name: 'password',
      stack: 'vertical',
      label: 'Password'
    },{
      type: 'button',
      name: 'login',
      label: 'Login',
      callback: ( event ) => {
        event.preventDefault()
        console.log( 'clicked' )
      }
    }
  ])
}

export const Home: ( props: PageProps ) => JSX.Element = ({ element }) => {
  const title = 'today'
  const theme = 'red'
  useSetPageProps( theme, '/' )

  return (
    <>
      <PageTitle
        title={ title }
        theme={ theme }
      />
      { element }
      <Menu
        cells={[
          {
            label: 'Login',
            url: '/login'
          }, {
            label: 'Sign Up',
            url: '/signup'
          }
        ]}
      />
    </>
  )
}