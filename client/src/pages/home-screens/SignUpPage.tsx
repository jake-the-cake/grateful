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
        const email: string = ( document.getElementById( 'email' ) as HTMLInputElement ).value
        const password: string = ( document.getElementById( 'password' ) as HTMLInputElement ).value
        useFetch( 'POST', '/user/add', { body: { email, password }
        })
          .then( d => d.json() )
          .then( data => console.log( data ))
          .catch( err => console.error( err.message ))
      }
    }
  ])
  )
}