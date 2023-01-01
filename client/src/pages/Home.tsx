import React, { ReactNode } from 'react'
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
  callback?: () => void
}


const TextInputUnderLabel = ({ label }: { label: string }) => {
  return (
    <>
      <label className='form__label'>{ label }</label>
      <input className='form__main' type='text' />
    </>
  )
}

const FormButton = () => {

}

const useBuildForm = ( data: BuildFormProps[] ): JSX.Element => {
  const elements: any[] = []
  data.forEach( d => {
    switch( d.type ) {
      case 'text':
        elements.push( <TextInputUnderLabel label={ d.label } /> )
        break
      default:
        break
    }
  })
  return (
    <div className='form__container'>
      { elements && elements.map( e => e )}
      <button className='form__button button-red'>Login</button>
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