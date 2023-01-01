import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle } from '../components/PageTitle'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  title?: string
  theme?: string
  element?: JSX.Element
}

export const Home = ({ element }: PageProps ): JSX.Element => {
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