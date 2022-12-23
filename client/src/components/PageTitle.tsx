import React from 'react'
import { PageProps } from '../pages/Home'

export const PageTitle: ( props: PageProps ) => JSX.Element = ({ title, theme }) => {
  return (
    <div className='page__title--container'>
      <span className={ `page__title--text ${ theme }-text` }>
        { title }.
      </span>
    </div>
  )
}