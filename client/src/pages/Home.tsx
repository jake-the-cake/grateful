import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle } from '../components/PageTitle'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  element?: JSX.Element
}

export const Home = ({ element }: PageProps ): JSX.Element => {
  const thisPage = useSetPageProps()

  return (
    <>
      <PageTitle thisPage={ thisPage } />
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