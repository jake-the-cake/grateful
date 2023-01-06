import React, { MouseEvent, useState } from 'react'
import { CustomForm } from '../../forms/CustomForm'
import { loginElements } from '../../forms/form-data/loginElements'
import { AuthErrorProps } from './SignUpPage'

export const LoginPage = (): JSX.Element => {
  const [ errors, setErrors ] = useState<AuthErrorProps | null>(null)

  const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()
    console.log( 'clicked' )
    // handle login
  }

  return (
    <CustomForm
      data={ loginElements({ submit: handleClick })}
      errors={ errors }
    />
  )
}