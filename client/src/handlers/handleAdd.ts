import { useFetch } from "../hooks/UseFetch"
import { loadPageSettings } from "../hooks/UseSetPageProps"

export const handleSubmitToApi= ( event: any, payload: string, user: any ) => {
	event.preventDefault()
	useFetch( 'POST', `${ loadPageSettings().page.url }/add`, {
		body: {
			user: user?.id ?? 'testuser',
			note: payload
		}
	})
	.then( d => d.json() )
	.then( d => console.log( d ))
	.catch(( error ) => console.error( error.message ))
}

export const handleFirstSubmit = ( event: any, setTryAgain, info: any ) => {
	event.preventDefault()
	// pull text area value
	const gratefulFor = ( document.getElementById( 'grateful' ) as HTMLTextAreaElement ).value
	// check for empty form
	if ( !gratefulFor ) {
		setTryAgain( true )
	}
	else {
		handleSubmitToApi( event, gratefulFor, info.user )
	}
}