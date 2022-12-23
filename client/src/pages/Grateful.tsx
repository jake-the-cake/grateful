import React from 'react'
import { Menu } from '../components/Menu'
import { SubmitForm } from '../components/SubmitForm'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  title: string
  theme: string
}

export const Grateful: ( props: PageProps ) => JSX.Element = ({ title, theme }) => {
  useSetPageProps( theme, '/grateful' )

  return (
    <>
      <div className='page__title--container'>
        <span className={ `page__title--text ${ theme }-text` }>
          { title }.
        </span>
      </div>
      <SubmitForm
        label='I am grateful for'
        placeholder='Speak your mind...'
        cols={ 30 }
        rows={ 8 }
        theme={ theme }
      />
      <Menu
        cells={[
          {
            label: 'idk'
          }, {

          }, {
            
          }
        ]}
      />
    </>
  )
}