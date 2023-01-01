import { useBuildForm } from '../../hooks/UseBuildForm'

export const LoginPage = (): JSX.Element => {
  return useBuildForm([
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
      type: 'button',
      name: 'login',
      label: 'Login',
      callback: ( event ) => {
        event.preventDefault()
        console.log( 'clicked' )
        // handle login
      }
    }
  ])
}