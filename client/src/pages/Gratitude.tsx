import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle } from '../components/PageTitle'
import { SubmitForm } from '../components/SubmitForm'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export const Gratitude: () => JSX.Element = () => {
  useSetPageProps()

  return (
    <>
      <PageTitle />
      <SubmitForm
        label='I am grateful for'
        placeholder='Speak your mind...'
        cols={ 30 }
        rows={ 8 }
      />
      <Menu
        cells={[
          {
            label: 'new'
          }, {
            label: 'past'
          }, {
            label: 'ideas'
          }
        ]}
      />
    </>
  )
}