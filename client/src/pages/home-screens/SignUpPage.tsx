import React, { MouseEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../App"
import { CustomForm } from "../../forms/CustomForm"
import { signUpElements } from "../../forms/form-data/signUpElements"
import { handleSignUp } from "../../handlers/handleSignUp"

export type ErrorResponseProps = {
  type: string
  message: string
}

export interface ResponseObjectProps {
  statusCode: number
  success: boolean
  data: any | null
  errors: ErrorResponseProps[] | null
}

export type AuthErrorProps = {
  email?: string
  password?: string
  confirm?: string
}

export const SignUpPage = () => {
  const { dispatch } = useContext<any>( AppContext )
  const [ errors, setErrors ] = useState<AuthErrorProps | null>(null)
  const navigate = useNavigate()

  const handleEvent = ( event: MouseEvent<HTMLButtonElement> ): void => {
    event.preventDefault()
    handleSignUp( event, setErrors, navigate, dispatch )
  }

  return (
    <CustomForm
      data={ signUpElements({ submit: handleEvent }) }
      errors={ errors }
    />
  )
}