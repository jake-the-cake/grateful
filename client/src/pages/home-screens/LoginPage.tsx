import React, { MouseEvent, useContext, useState } from 'react'
import { CustomForm } from '../../forms/CustomForm'
import { loginElements } from '../../forms/form-data/loginElements'
import { AuthErrorProps } from './SignUpPage'
import { AppContext } from "../../App"

export const LoginPage = (): JSX.Element => {
  const ctx: any = useContext( AppContext )
  const [ errors, setErrors ] = useState<AuthErrorProps | null>(null)

  const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()
    console.log( 'clicked' )
    // handle login
    ctx.dispatch({ type: 'nothing' })

  }

  return (
    <CustomForm
      data={ loginElements({ submit: handleClick })}
      errors={ errors }
    />
  )
}