import { useContext } from "react"
import { AppContext } from "../App"
import { appSettings } from "../data/appSettings"

export const returnBasePath = () => {
  const { routes } = appSettings 
  const basePath = '/' + window.location.pathname.split( '/' )[ 1 ]
  if ( !routes.main.includes( basePath )) return '/'
  return basePath
}

export const loadPageSettings = ( obj?: any ) => {
  const { pages } = appSettings
  if ( !obj ) obj = { basePath: returnBasePath() }
  Object.keys( pages ).forEach( pg => {
    const page = pages[ pg ]
    if ( page.url === obj.basePath ) {
      obj.theme = page.theme
      obj.page = page
    }
  })
  return obj
}

export const useSetPageProps = () => {
  // import context and app settings
  const ctx: any = useContext( AppContext )
  const { pages, routes } = appSettings
  
  // create function object
  const thisObj = {
    path: window.location.pathname,
    basePath: returnBasePath(),
    theme: 'dark',
    page: null
  }

  // load then execute changes
  loadPageSettings( thisObj )
  ctx.dispatch({ type: 'SET-THEME', theme: thisObj.theme })
  ctx.dispatch({ type: 'SET-URL', url: thisObj.path })

  // return page info or error
  return thisObj.page || { error: {
    type: 404,
    message: `No page settings found for ${ thisObj.path }`
  } }
}