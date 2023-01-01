import { ErrorLogProps, ErrorTypes } from "../types/errorTypes"
import { notProvided } from "./notProvided"

export const createErrorLog: ( errorCode: string ) => ErrorLogProps = ( errorCode ) => {

  if ( errorCode.slice( 0, 2 ) === 'no' ) return notProvided( errorCode.replace( 'no', '' ) )

  switch ( errorCode ) {
    case 'server':
      return {
        type: ErrorTypes.Server,
        message: 'An internal server error has occured.'
      }
    case 'dupemail':
      return {
        type: ErrorTypes.Duplicate,
        message: 'Email address in use already'
      }
    default:
      return {
        type: ErrorTypes.Default,
        message: 'Some sort of error has occurred.'
      }
  }
}