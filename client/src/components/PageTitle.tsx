import React from 'react'
import { useNavigate } from 'react-router'
import { appSettings } from '../data/appSettings'

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

const PageArrowReducer = ( arrow: PAGE_TITLE_ARROWS, icon: string, navigate: any ) => {
  const { pages } = appSettings
  const arrowObject = {
    theme: pages[ arrow ].theme || 'dark',
    url: pages[ arrow ].url || '/',
  }

  // arrowObject.theme = pages[ arrow ].theme
  // arrowObject.url = pages[ arrow ].url
  
  // switch ( arrow ) {
  //   case PAGE_TITLE_ARROWS.GRATITUDE:
  //     arrowObject.theme = pages[ arrow.toLowerCase() ]
  //     arrowObject.url = '/gratitude'
  //     break
  //   case PAGE_TITLE_ARROWS.ACHIEVEMENT:
  //     arrowObject.theme = 'blue'
  //     arrowObject.url = '/achievement'
  //     break
  //   case PAGE_TITLE_ARROWS.INSPIRATION:
  //     arrowObject.theme = 'purple'
  //     arrowObject.url = '/inspiration'
  //     break
  //   default:
  //     return false
  // }
  return (
    <div className={ `arrow__container ${ arrowObject.theme }-text arrow-${ arrowObject.theme }` } onClick={ () => { navigate( arrowObject.url )} }>{ icon || 'nothing' }</div>
  )
}

export const PageTitle: ( props: PageTitleProps ) => JSX.Element = ({ thisPage }) => {
  const navigate = useNavigate()
  return (
    <div className='page__title--container'>
      {
        thisPage.left !== undefined && PageArrowReducer( thisPage.left, '<', navigate )
      }
      <span className={ `page__title--text ${ thisPage.theme || 'dark' }-text` }>
        { thisPage.title || 'no title' }.
      </span>
      {
        thisPage.right !== undefined && PageArrowReducer( thisPage.right, '>', navigate )
      }
    </div>
  )
}