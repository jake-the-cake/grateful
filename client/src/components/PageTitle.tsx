import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import { appSettings } from '../data/appSettings'

export interface PageTitleProps {
  thisPage: {
    title: string
    theme: string
    left?: PAGE_TITLE_ARROWS
    right?: PAGE_TITLE_ARROWS
  }
}

export type NavigationArrowProps = ( props: {
  destination: PAGE_TITLE_ARROWS
  icon: string
  navigate: NavigateFunction
}) => JSX.Element

export const enum PAGE_TITLE_ARROWS {
  GRATITUDE = 'gratitude',
  INSPIRATION = 'inspiration',
  ACHIEVEMENT = 'achievement'
}

const NavigationArrow: NavigationArrowProps = ({ destination, icon, navigate }) => {
  const page = appSettings.pages[ destination ]
  return (
    <div className={ `arrow__container ${ page.theme }-text arrow-${ page.theme }` } onClick={ () => { navigate( page.url )} }>{ icon || 'nothing' }</div>
  )
}

export const PageTitle: ( props: PageTitleProps ) => JSX.Element = ({ thisPage }) => {
  return (
    <div className='page__title--container'>
      {
        thisPage.left !== undefined && <NavigationArrow
          destination={ thisPage.left }
          icon={ '<' }
          navigate={ useNavigate() }
        />
      }
      <span className={ `page__title--text ${ thisPage.theme || 'dark' }-text` }>
        { thisPage.title || 'no title' }.
      </span>
      {
        thisPage.right !== undefined && <NavigationArrow 
          destination={ thisPage.right }
          icon={ '>' }
          navigate={ useNavigate() }
        />
      }
    </div>
  )
}