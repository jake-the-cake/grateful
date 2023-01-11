import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle, PAGE_TITLE_ARROWS } from '../components/PageTitle'
import { SubmitForm } from '../components/SubmitForm'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export const Achievement: () => JSX.Element = () => {
  useSetPageProps()

  return (
    <>
      <PageTitle />
      <SubmitForm
        label='What can I accomplish today?'
        placeholder='Reach towards those goals...'
        cols={ 30 }
        rows={ 8 }
      />
      <Menu
        cells={[
          {
            label: 'new'
          }, {
            label: 'history'
          }, {
            label: 'goals'
          }
        ]}
      />
    </>
  )
}