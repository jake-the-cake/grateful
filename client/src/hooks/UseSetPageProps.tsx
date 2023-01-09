import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import { appSettings } from "../data/appSettings"

export const returnBaseDir = () => {
  const { routes } = appSettings 
  const baseDir = '/' + window.location.pathname.split( '/' )[ 1 ]
  if ( !routes.main.includes( baseDir )) return '/'
  return baseDir
}

export const loadPageSettings = ( obj?: any ) => {
  const { pages } = appSettings
  if ( !obj ) obj = { baseDir: returnBaseDir() }
  Object.keys( pages ).forEach( pg => {
    const page = pages[ pg ]
    if ( page.url === obj.baseDir ) {
      obj.theme = page.theme || obj.theme
      obj.page =  { ...pages.defaults.page, page }
    }
  })
  return obj
}

export const useSetPageProps = () => {
  // import context and app settings
  const ctx: any = useContext( AppContext )
  const { pages } = appSettings

  // create function object
  const thisObj = {
    path: window.location.pathname,
    baseDir: returnBaseDir(),
    theme: pages.defaults.page.theme,
    page: null
  }

  // load then execute changes
  loadPageSettings( thisObj )
  console.log( thisObj )
  useEffect(() => {
    ctx.dispatch({ type: 'SET-THEME', theme: thisObj.theme })
    ctx.dispatch({ type: 'SET-URL', url: thisObj.path })
  }, [])

  // return page info or error
  return thisObj.page || { error: {
    type: 404,
    message: `No page settings found for ${ thisObj.path }`
  } }
}