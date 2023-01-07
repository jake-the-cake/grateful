import { useFetch } from "../hooks/UseFetch"
import { useValidation } from "../hooks/UseValidation"
import { ResponseObjectProps } from "../pages/home-screens/SignUpPage"
import { displayErrors } from "./displayErrors"

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
    if ( inputs.password !== inputs.confirm ) errorObject.confirm = 'These passwords do not match.'
  
    if ( Object.keys( errorObject ).length > 0 ) {
      setErrors( errorObject )
    }
    else {
      setErrors( null )
      useFetch( 'POST', '/user/add', { body: inputs })
        .then( d => d.json() )
        .then(( data: ResponseObjectProps ) => {
          console.log( data )
          if( !data.errors ) navigate( '/gratitude' )
          else displayErrors( data, setErrors )
        })
        .catch(( err ) => console.log( err.message ))
    }
}