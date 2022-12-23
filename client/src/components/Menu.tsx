import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'

export const Menu = () => {
  const CTX: any = useContext( AppContext )
  console.log( CTX.info.theme )

  const [ theme, setTheme ] = useState( '' )
  useEffect(() => {
    setTheme( CTX.info.theme )
  }, [ CTX.info.theme ])

  const handleChangeActiveMenu = ( event ) => {
    ( event.target as HTMLDivElement ).classList.toggle( 'menu-active' )
  }
  const cellArray = [
    'A', 'B', 'C'
  ]
  const buildMenuCells = ( cell: any, index: number ) => {
    console.log( cell )
    const id = `menucell${ index }`
    return (
      <div id={ id } key={ id } className='menu__cell' onClick={ handleChangeActiveMenu }>A</div>
    )
  }

  return (
    <div id='menu' className={`menu__container menu-${ theme }` }>
      {
        cellArray.map( (cell, index ) => buildMenuCells( cell, index ) )
      }
    </div>
  )
}