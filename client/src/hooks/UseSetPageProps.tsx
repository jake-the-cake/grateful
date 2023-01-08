import { useContext } from "react"
import { AppContext } from "../App"
import { appSettings } from "../data/appSettings"

export const useSetPageProps = () => {
  // import context and app settings
  const ctx: any = useContext( AppContext )
  const { pages, routes } = appSettings

  // handle exception for '/...' routes
  const thisBasePath = () => {
    const basePath = '/' + window.location.pathname.split( '/' )[ 1 ]
    if ( !routes.main.includes( basePath )) return '/'
    return basePath
  }
  
  // create function object
  const thisObj = {
    path: window.location.pathname,
    basePath: thisBasePath(),
    theme: 'dark',
    page: null
  }
  
  // locate and load page settings
  Object.keys( pages ).forEach( pg => {
    const page = pages[ pg ]
    console.log( page.url, thisObj.basePath )
    if ( page.url === thisObj.basePath ) {
      thisObj.theme = page.theme
      thisObj.page = page
    }
  })

  // execute changes
  ctx.dispatch({ type: 'SET-THEME', theme: thisObj.theme })
  ctx.dispatch({ type: 'SET-URL', url: thisObj.path })

  // return page settings info
  return thisObj.page || { error: 'No page settings found.' }
}