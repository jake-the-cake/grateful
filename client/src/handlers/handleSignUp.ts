import { useFetch } from "../hooks/UseFetch"
import { useValidation } from "../hooks/UseValidation"
import { ResponseObjectProps } from "../pages/home-screens/SignUpPage"
import { displayErrors } from "./displayErrors"
import { appSettings } from "../data/appSettings"

export const handleSignUp = ( event, setErrors, navigate ) => {
	//object with input values
  const inputs = {
    email: ( document.getElementById( 'email' ) as HTMLInputElement ).value,
    password: ( document.getElementById( 'password' ) as HTMLInputElement ).value,
    confirm: ( document.getElementById( 'confirm' ) as HTMLInputElement ).value
  }
  // init error array
  const errorObject: any = {}
  // run frontend checks
  if ( !useValidation( inputs ).success ) errorObject.email = 'This email address is invalid.'
  if ( inputs.password.length < 6 ) errorObject.password = 'Passwords must be 6+ characters.'
  if ( inputs.email.length < 1 ) errorObject.email = 'An email is required.'
  if ( inputs.password.length < 1 ) errorObject.password = 'A password is required.'
  if ( inputs.password !== inputs.confirm ) errorObject.confirm = 'These passwords do not match.'
  
  if ( Object.keys( errorObject ).length > 0 ) { // if client errors exist
    setErrors( errorObject ) // display errors
  }
  else { // if no client errors
    setErrors( null ) // clear errors
    useFetch( 'POST', '/user/add', { body: inputs }) // API request hook
    .then( d => d.json() )
    .then(( data: ResponseObjectProps ) => {
      console.log( data ) // log api response
      if( !data.errors ) navigate( appSettings.pages.defaults.postAuthUrl ) // API RESPONSE SUCCESS
      else displayErrors( data, setErrors ) // display api errors
    })
    .catch(( err ) => console.log( err.message )) // catch misc errors
  }
}