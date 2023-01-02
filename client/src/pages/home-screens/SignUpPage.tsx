import { Dispatch, MouseEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBuildForm } from "../../hooks/UseBuildForm"
import { useFetch } from "../../hooks/UseFetch"

const displayErrors = ( data: ResponseObjectProps, setErrors: Dispatch<SignUpErrorsProps | null> ) => {
  const errorArray: any = []
  const errorObject: any = {}
  data.errors!.forEach(( err: any ) => {
    errorArray.push( err.message.split( '-' )[ 1 ].trim() )
  })
  errorArray.forEach(( err: string, index: number ) => {
    errorObject[ err ] = data.errors![ index ].message.replaceAll( '-', '')
  })
  setErrors( errorObject )
  console.log( errorObject )
}

export interface ResponseObjectProps {
  statusCode: number
  success: boolean
  data: any | null
  errors: any[] | null
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
    useFetch( 'POST', '/user/add', { body: {
      email: ( document.getElementById( 'email' ) as HTMLInputElement ).value,
      password: ( document.getElementById( 'password' ) as HTMLInputElement ).value
    }})
      .then( d => d.json() )
      .then(( data ) => {
        console.log( data )
        if( !data.errors ) {
          setErrors( null )
          navigate( '/grateful' )
        }
        else displayErrors( data, setErrors )
      })
      .catch( err => console.error( err.message ))
  }

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