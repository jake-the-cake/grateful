import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { useSetPageProps } from '../hooks/UseSetPageProps'

interface MenuProps {
  cells: {
    label?: string
    icon?: string
    url?: string
    onClick?: () => void
  }[]
}

export const Menu: ( props: MenuProps ) => JSX.Element = ({ cells }) => {
  const CTX: any = useContext( AppContext )
  const nav = useNavigate()
  const handleChangeActiveMenu = ( event, url ) => {
    Array.from( document.getElementsByClassName( 'menu__cell' )).forEach( cell => {
      cell.classList.remove( 'menu-active' )
    });
    ( event.target as HTMLDivElement ).classList.add( 'menu-active' )
    nav( url || '#' )
    url && CTX.dispatch({ type: 'SET-URL', url })
  }

  const buildMenuCells = ( cell: any, index: number ) => {
    const id = `menucell${ index }`
    return (
      <div id={ id } key={ id } className='menu__cell' onClick={ ( e ) => handleChangeActiveMenu( e, cell.url) }>{ cell.label || 'no label' }</div>
    )
  }

  return (
    <div id='menu' className={ `menu__container` }>
      {
        cells.map(( cell, index ) => buildMenuCells( cell, index ))
      }
    </div>
  )
}