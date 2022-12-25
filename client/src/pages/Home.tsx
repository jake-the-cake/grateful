import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle, PAGE_TITLE_ARROWS } from '../components/PageTitle'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  title?: string
  theme?: string
  element?: JSX.Element
}

export const Homepage = () => {
  return (
    <div className='main__block'>
      <div className='main__block--p'>
        Good morning, and welcome to <span className='text-emphasis'>today.</span>, your personal reflection assistant. It only takes a few moments each day to help yourself heading in the right direction. Just use the menu below to login or create an account.
      </div>
      <div className='main__block--p'>
        Everthing within this app is 100% anonymous; you will not be required to give any personal information, and any information that you voluntarily give will never be shared. In fact, you can even sign up with a fake email address, and we would never know!
      </div>
      <div className='main__block--p'>
        There is no charge to use this service. We just ask that you spread the word to others who may benifit. If you have ideas to improve this service, reach out to quietgoatlabs@gmail.com
      </div>
    </div>
  )
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
        left={ PAGE_TITLE_ARROWS.IMPROVEMENT }
        right={ PAGE_TITLE_ARROWS.GRATITUDE }
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