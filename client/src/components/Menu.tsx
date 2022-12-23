import React from 'react'

interface MenuProps {
  cells: {
    label?: string
    icon?: string
    url?: string
    onClick?: () => void
  }[]
}

export const Menu = ({ cells }) => {

  const handleChangeActiveMenu = ( event ) => {
    Array.from( document.getElementsByClassName( 'menu__cell' )).forEach( cell => {
      cell.classList.remove( 'menu-active' )
    });
    ( event.target as HTMLDivElement ).classList.add( 'menu-active' )
  }

  const buildMenuCells = ( cell: any, index: number ) => {
    const id = `menucell${ index }`
    return (
      <div id={ id } key={ id } className='menu__cell' onClick={ handleChangeActiveMenu }>{ cell.label || 'no label' }</div>
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