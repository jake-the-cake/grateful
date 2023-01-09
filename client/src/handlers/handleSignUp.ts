import { useFetch } from "../hooks/UseFetch"
import { useValidation } from "../hooks/UseValidation"
import { ResponseObjectProps } from "../pages/home-screens/SignUpPage"
import { displayErrors } from "./displayErrors"
import bc from 'bcryptjs'
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
  
  if ( Object.keys( errorObject ).length > 0 ) {
    setErrors( errorObject )
  }
  else {
    setErrors( null )
    const saltRounds = 10
    bc.genSalt( saltRounds, function(err, salt) {
      bc.hash( inputs.password, salt, function(err, hash) {
        inputs.password = hash
        useFetch( 'POST', '/user/add', { body: inputs })
          .then( d => d.json() )
          .then(( data: ResponseObjectProps ) => {
            console.log( data )
            if( !data.errors ) navigate( appSettings.pages.defaults.postAuthUrl )
            else displayErrors( data, setErrors )
          })
          .catch(( err ) => console.log( err.message ))
      })
    })
  }
}