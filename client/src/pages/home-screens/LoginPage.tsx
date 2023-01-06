import React, { useState } from 'react'
import { CustomForm } from '../../forms/CustomForm'
import { useBuildForm } from '../../hooks/UseBuildForm'
import { AuthErrorProps } from './SignUpPage'

export const LoginPage = (): JSX.Element => {
  const [ errors, setErrors ] = useState<AuthErrorProps | null>(null)

  return (
    <CustomForm
      data={[
        {
          type: 'text',
          name: 'email',
          stack: 'vertical',
          label: 'Email Address',
        },{
          type: 'password',
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
      ]}
      errors={ errors }
    />
  )
}