import React from 'react'
import { Menu } from '../components/Menu'
import { PageTitle, PAGE_TITLE_ARROWS } from '../components/PageTitle'
import { SubmitForm } from '../components/SubmitForm'
import { useSetPageProps } from '../hooks/UseSetPageProps'

export const Inspiration: () => JSX.Element = () => {
  useSetPageProps()

  return (
    <>
      <PageTitle />
      <SubmitForm
        label='Say a little something that someone needs to hear today.'
        placeholder='Insert your motivating words of wisdom...'
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