import React from 'react'

export const Menu = () => {
  const handleChangeActiveMenu = ( event ) => {
    Array.from( document.getElementsByClassName( 'menu__cell' )).forEach( cell => {
      cell.classList.remove( 'menu-active' )
    });
    ( event.target as HTMLDivElement ).classList.add( 'menu-active' )
  }
  const cellArray = [
    'A', 'B', 'C'
  ]
  const buildMenuCells = ( cell: any, index: number ) => {
    const id = `menucell${ index }`
    return (
      <div id={ id } key={ id } className='menu__cell' onClick={ handleChangeActiveMenu }>{ cell }</div>
    )
  }

  return (
    <div id='menu' className={ `menu__container` }>
      {
        cellArray.map( (cell, index ) => buildMenuCells( cell, index ) )
      }
    </div>
  )
}