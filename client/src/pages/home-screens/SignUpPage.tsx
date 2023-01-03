import { Dispatch, MouseEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBuildForm } from "../../hooks/UseBuildForm"
import { useFetch } from "../../hooks/UseFetch"
import { useValidation } from "../../hooks/UseValidation"

const displayErrors = ( data: ResponseObjectProps, setErrors: Dispatch<SignUpErrorsProps | null> ) => {
  const errorArray: any = []
  data.errors!.forEach(( err: any ) => {
    errorArray.push( err.message.split( '-' )[ 1 ].trim() )
  })
  errorArray.forEach(( err: string, index: number ) => {
    errorArray[ err ] = ( data.errors![ index ].message as any ).replaceAll( '-', '')
  })
  setErrors( errorArray )
}

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

type SignUpErrorsProps = {
  email?: string
  password?: string
  confirm?: string
}

export const SignUpPage = () => {
  const [ errors, setErrors ] = useState<SignUpErrorsProps | null>(null)
  const navigate = useNavigate()

  const handleSignUp = ( event: MouseEvent<HTMLButtonElement> ): void => {
    event.preventDefault()
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
          if( !data.errors ) navigate( '/grateful' )
          else displayErrors( data, setErrors )
        })
        .catch(( err ) => console.log( err.message ))
    }
  }

  return (
   useBuildForm([
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
      type: 'password',
      name: 'confirm',
      stack: 'vertical',
      label: 'Confirm Password'
    },{
      type: 'button',
      name: 'signup',
      label: 'Create Account',
      callback: handleSignUp
    }
  ], errors )
  )
}