import React from 'react'
import { useNavigate } from 'react-router'
import { loadPageSettings } from '../hooks/UseSetPageProps'
import { NavigationArrow } from './NavigationArrow'

export interface PageTitleProps {
  thisPage?: {
    title: string
    theme: string
    page?: any
    left?: PAGE_TITLE_ARROWS
    right?: PAGE_TITLE_ARROWS
  }
}

export const enum PAGE_TITLE_ARROWS {
  GRATITUDE = 'gratitude',
  INSPIRATION = 'inspiration',
  ACHIEVEMENT = 'achievement'
}

export const PageTitle: ( props: PageTitleProps ) => JSX.Element = () => {
  const { title, theme, arrows } = loadPageSettings().page
  return (
    <div className='page__title--container'>
      <NavigationArrow
          destination={ arrows?.left ?? null }
          direction={ 'left' }
        />
      <span className={ `page__title--text ${ theme }-text` }>
        { title || 'no title' }.
      </span>
      <NavigationArrow 
          destination={ arrows?.right ?? null }
          direction={ 'right' }
        />
    </div>
  )
}