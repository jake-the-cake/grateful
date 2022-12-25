import React from 'react'
import { PageProps } from '../pages/Home'

export interface PageTitleProps {
  title: string
  theme: string
  left?: PAGE_TITLE_ARROWS
  right?: PAGE_TITLE_ARROWS
}

export const enum PAGE_TITLE_ARROWS {
  GRATITUDE,
  MOTIVATION,
  IMPROVEMENT
}

const PageArrowReducer = ( arrow: PAGE_TITLE_ARROWS, icon: string ) => {
  const arrowObject = {
    theme: '',
    url: ''
  }
  switch ( arrow ) {
    case PAGE_TITLE_ARROWS.GRATITUDE:
      arrowObject.theme = 'green'
      arrowObject.url = '/grateful'
      break
    case PAGE_TITLE_ARROWS.IMPROVEMENT:
      arrowObject.theme = 'blue'
      arrowObject.url = '/grateful'
      break
    case PAGE_TITLE_ARROWS.MOTIVATION:
      arrowObject.theme = 'purple'
      arrowObject.url = '/grateful'
      break
    default:
      return false
  }
  return (
    <div className={ `${ arrowObject.theme }-text` }>{ icon || 'nothing' }</div>
  )
}

export const PageTitle: ( props: PageTitleProps ) => JSX.Element = ({ title, theme, left, right }) => {
  return (
    <div className='page__title--container'>
      {
        left !== undefined && PageArrowReducer( left, '<' )
      }
      <span className={ `page__title--text ${ theme }-text` }>
        { title }.
      </span>
      {
        right !== undefined && PageArrowReducer( right, '>' )
      }
    </div>
  )
}