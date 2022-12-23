import React from 'react'
import { PageTitle } from '../components/PageTitle'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  title: string
  theme: string
}

export const Home: ( props: PageProps ) => JSX.Element = ({ title, theme }) => {
  useSetPageProps( theme, '/' )

  return (
    <>
      <PageTitle title={ title } theme={ theme } />
      <div>Home Page</div>
      <button className={`form__button button-${ theme }`}>Add</button>
    </>
  )
}