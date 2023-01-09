import React from 'react'
import { NavigateFunction } from "react-router-dom"
import { appSettings } from "../data/appSettings"
import { PAGE_TITLE_ARROWS } from "./PageTitle"

type NavigationArrowProps = ( props: {
  destination: PAGE_TITLE_ARROWS
  direction: string
  navigate: NavigateFunction
}) => JSX.Element

export const NavigationArrow: NavigationArrowProps = ({ destination, direction, navigate }) => {
  const page = appSettings.pages[ destination ]
  let icon: string
  switch ( direction ) {
    case 'left':
      icon = '<'
      break
    case 'right':
      icon = '>'
      break
    default:
      icon = '+'
  }
  return (
    <div 
      className={ `arrow__container ${ page.theme }-text arrow-${ page.theme } arrow-${ direction }` } 
      onClick={ () => { navigate( page.url )} }
    >
      { icon }
    </div>
  )
}