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
  const theme = 'blue'

  const thisPage: any = useSetPageProps()
  console.log( thisPage )

  return (
    <>
      <PageTitle
        title={ thisPage.title || 'no title' }
        theme={ thisPage.theme || 'red' }
        thisPage={ thisPage }
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