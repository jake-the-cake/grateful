import { Dispatch } from "react"
import { AuthErrorProps, ResponseObjectProps } from "../pages/home-screens/SignUpPage"

export const displayErrors = ( data: ResponseObjectProps, setErrors: Dispatch<AuthErrorProps | null> ) => {
  const errorArray: any = []
  data.errors!.forEach(( err: any ) => {
    errorArray.push( err.message.split( '-' )[ 1 ].trim() )
  })
  errorArray.forEach(( err: string, index: number ) => {
    errorArray[ err ] = ( data.errors![ index ].message as any ).replaceAll( '-', '')
  })
  setErrors( errorArray )
}