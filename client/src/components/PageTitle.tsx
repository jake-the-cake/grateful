import React from 'react'
import { useNavigate } from 'react-router'
import { NavigationArrow } from './NavigationArrow'

export interface PageTitleProps {
  thisPage: {
    title: string
    theme: string
    left?: PAGE_TITLE_ARROWS
    right?: PAGE_TITLE_ARROWS
  }
}

export const enum PAGE_TITLE_ARROWS {
  GRATITUDE = 'gratitude',
  INSPIRATION = 'inspiration',
  ACHIEVEMENT = 'achievement'
}

export const PageTitle: ( props: PageTitleProps ) => JSX.Element = ({ thisPage }) => {
  return (
    <div className='page__title--container'>
      {
        thisPage.left !== undefined && <NavigationArrow
          destination={ thisPage.left }
          direction={ 'left' }
          navigate={ useNavigate() }
        />
      }
      <span className={ `page__title--text ${ thisPage.theme }-text` }>
        { thisPage.title || 'no title' }.
      </span>
      {
        thisPage.right !== undefined && <NavigationArrow 
          destination={ thisPage.right }
          direction={ 'right' }
          navigate={ useNavigate() }
        />
      }
    </div>
  )
}