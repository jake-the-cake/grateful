import { useBuildForm } from "../../hooks/UseBuildForm"
import { useFetch } from "../../hooks/UseFetch"

export const SignUpPage = () => {
  return (
   useBuildForm([
    {
      type: 'text',
      name: 'email',
      stack: 'vertical',
      label: 'Email Address',
    },{
      type: 'text',
      name: 'password',
      stack: 'vertical',
      label: 'Password'
    },{
      type: 'text',
      name: 'confirm-password',
      stack: 'vertical',
      label: 'Confirm Password'
    },{
      type: 'button',
      name: 'signup',
      label: 'Create Account',
      callback: ( event ) => {
        event.preventDefault()
        console.log( 'clicked' )
        // handle sign up
        useFetch( 'GET', '/view', {})
          .then( d => d.json() )
          .then( data => console.log( data ))
          .catch( err => console.error( err.message ))
      }
    }
  ])
  )
}