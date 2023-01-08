import React from 'react'
import { useNavigate } from 'react-router'

export interface PageTitleProps {
  thisPage?: any
  left?: PAGE_TITLE_ARROWS
  right?: PAGE_TITLE_ARROWS
}

export const enum PAGE_TITLE_ARROWS {
  GRATITUDE,
  MOTIVATION,
  IMPROVEMENT
}

const PageArrowReducer = ( arrow: PAGE_TITLE_ARROWS, icon: string, navigate: any ) => {
  const arrowObject = {
    theme: '',
    url: ''
  }
  switch ( arrow ) {
    case PAGE_TITLE_ARROWS.GRATITUDE:
      arrowObject.theme = 'green'
      arrowObject.url = '/gratitude'
      break
    case PAGE_TITLE_ARROWS.IMPROVEMENT:
      arrowObject.theme = 'blue'
      arrowObject.url = '/achievement'
      break
    case PAGE_TITLE_ARROWS.MOTIVATION:
      arrowObject.theme = 'purple'
      arrowObject.url = '/inspiration'
      break
    default:
      return false
  }
  return (
    <div className={ `arrow__container ${ arrowObject.theme }-text arrow-${ arrowObject.theme }` } onClick={ () => { navigate( arrowObject.url )} }>{ icon || 'nothing' }</div>
  )
}

export const PageTitle: ( props: PageTitleProps ) => JSX.Element = ({ left, right, thisPage }) => {
  const navigate = useNavigate()
  return (
    <div className='page__title--container'>
      {
        left !== undefined && PageArrowReducer( left, '<', navigate )
      }
      <span className={ `page__title--text ${ thisPage.theme || 'dark' }-text` }>
        { thisPage.title || 'no title' }.
      </span>
      {
        right !== undefined && PageArrowReducer( right, '>', navigate )
      }
    </div>
  )
}