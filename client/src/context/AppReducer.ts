export interface ReducerProps {
	url?: string
	theme: string
	loginStatus?: boolean
	user: any
}

export const AppReducer = ( state: ReducerProps, action: any ) => {

  switch ( action.type ) {
    case 'SET-THEME':
      if ( !action.theme ) {
        console.error( 'no theme color provided' )
        return state
      }
      else {
        console.info( `Theme changed to '${ action.theme }'` );
        ( document.getElementById( 'menu' ) as HTMLDivElement ).classList.value = `menu__container menu-${ action.theme }`;
        ( document.getElementById( 'qg-link' ) as HTMLDivElement ).classList.value = `link-clean hover-${ action.theme }`;
        Array.from( document.getElementsByClassName( 'footer__link' )).forEach( link => {
          link.classList.value = `footer__link hover-${ action.theme }`;
        })
        state.theme = action.theme
        return state
      }
    case 'LOGIN-CHECK':
      if ( state.loginStatus === undefined ) {
        // check cookies
          /*
            need to build
          */
        // if not previously logged in
        state.loginStatus = false
      }
      return state
    case 'SET-URL':
      console.info( `URL changed to '${ action.url }'` )
      state.url = action.url
      return state
    default:
      console.log( 'nothing happened' )
      return state
  }
}