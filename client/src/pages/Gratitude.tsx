import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle, PAGE_TITLE_ARROWS } from '../components/PageTitle'
import { SubmitForm } from '../components/SubmitForm'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export interface PageProps {
  title: string
  theme: string
}

export const Gratitude: ( props: PageProps ) => JSX.Element = ({ title, theme }) => {
  useSetPageProps( theme, '/gratitude' )

  return (
    <>
      <PageTitle
        title={ title }
        theme={ theme }
        left={ PAGE_TITLE_ARROWS.IMPROVEMENT }
        right={ PAGE_TITLE_ARROWS.MOTIVATION }
      />
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
            label: 'label 2'
          }, {

          }
        ]}
      />
    </>
  )
}