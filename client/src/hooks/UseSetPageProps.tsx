import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import { appSettings } from "../data/appSettings"

export const useSetPageProps = () => {
  const ctx: any = useContext( AppContext )
  const thisPath = window.location.pathname
  let thisTheme = 'red'
  let thisPage = {}
  
  // find theme
  const { pages } = appSettings
  Object.keys( pages ).forEach( pg => {
    const page = pages[ pg ]
    if ( page.url === thisPath ) {
      thisTheme = page.theme
      thisPage = page
    }
  })

  // set
  useEffect(() => {
    if ( ctx.info.theme !== thisTheme ) {
      ctx.dispatch({ type: 'SET-THEME', theme: thisTheme })
    }
    if ( ctx.info.url !== thisPath ) {
      ctx.dispatch({ type: 'SET-URL', url: thisPath })
    }
  }, [])
  
  return thisPage
}