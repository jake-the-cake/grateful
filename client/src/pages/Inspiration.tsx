import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle, PAGE_TITLE_ARROWS } from '../components/PageTitle'
import { SubmitForm } from '../components/SubmitForm'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export const Inspiration: () => JSX.Element = () => {
  const thisPage: any = useSetPageProps()
  thisPage.left = PAGE_TITLE_ARROWS.GRATITUDE
  thisPage.right = PAGE_TITLE_ARROWS.ACHIEVEMENT

  return (
    <>
      <PageTitle thisPage={ thisPage } />
      <SubmitForm
        label='I am grateful for'
        placeholder='Speak your mind...'
        cols={ 30 }
        rows={ 8 }
      />
      <Menu
        cells={[
          {
            label: 'get'
          }, {
            label: 'give'
          }
        ]}
      />
    </>
  )
}