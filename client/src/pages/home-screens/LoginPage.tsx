import React, { MouseEvent, useContext, useState } from 'react'
import { CustomForm } from '../../forms/CustomForm'
import { loginElements } from '../../forms/form-data/loginElements'
import { AuthErrorProps } from './SignUpPage'
import { AppContext } from "../../App"
import { ResponseObjectProps } from "./SignUpPage" // don't delete yet
import { useFetch } from '../../hooks/UseFetch'
import bc from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { appSettings } from '../../data/appSettings'

export const LoginPage = (): JSX.Element => {
  const ctx: any = useContext( AppContext )
  const [ errors, setErrors ] = useState<AuthErrorProps | null>(null)
  const navigate = useNavigate()

  const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()
   	//object with input values
    const inputs = {
      email: ( document.getElementById( 'email' ) as HTMLInputElement ).value,
      password: ( document.getElementById( 'password' ) as HTMLInputElement ).value,
    }
    // init error array
    const errorObject: any = {}
    // run frontend checks
    if ( inputs.email.length < 1 ) errorObject.email = 'An email is required.'
    if ( inputs.password.length < 1 ) errorObject.password = 'A password is required.'
  
    if ( Object.keys( errorObject ).length > 0 ) {
      setErrors( errorObject )
    }
    else {
      useFetch( 'GET', '/user/find/all', {} )
        .then( d => d.json() )
        .then(( data: any ) => {
          setErrors( null )
          const queryResult = data.filter( user => user.email === inputs.email )
          if ( queryResult.length > 0 ) {
            console.log( queryResult )
            console.log( inputs.password )
            bc.compare( inputs.password, queryResult[ 0 ].password, function( err, result ) {
              if ( result ) {
                ctx.dispatch({ type: 'LOGIN_SUCCESS', userId: queryResult[ 0 ]._id })
                navigate( appSettings.pages.defaults.postAuthUrl )
              }
              else {
                errorObject.password = 'Incorrect password.'
                setErrors( errorObject )
              }
            })
          }
          else {
            errorObject.email = 'User not found.'
            setErrors( errorObject )
          }
        })
    }
  }

  return (
    <CustomForm
      data={ loginElements({ submit: handleClick })}
      errors={ errors }
    />
  )
}