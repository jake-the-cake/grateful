import { useContext, useEffect } from "react"
import { AppContext } from "../App"

export const useSetPageProps = ( theme, url ) => {
  const CTX: any = useContext( AppContext )
  
  useEffect(() => {
    if ( CTX.info.theme !== theme ) {
      CTX.dispatch({ type: 'SET-THEME', theme })
    }
    if ( CTX.info.url !== url ) {
      CTX.dispatch({ type: 'SET-URL', url })
    }
  }, [])

  console.log( CTX )
}