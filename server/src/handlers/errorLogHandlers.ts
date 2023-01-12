import { ErrorLogProps, ErrorTypes } from "../types/errorTypes"
import { notProvided } from "./notProvided"

export const createErrorLog: ( errorCode: string ) => ErrorLogProps = ( errorCode ) => {

  if ( errorCode.slice( 0, 2 ) === 'no' ) return notProvided( errorCode.replace( 'no', '' ) )

  switch ( errorCode ) {
    case '404user':
      return {
        type: ErrorTypes.NotFound,
        message: 'User not found.'
      }
    case 'server':
      return {
        type: ErrorTypes.Server,
        message: 'An internal server error has occured.'
      }
    // TODO
    // 
    case 'dupemail':
      return {
        type: ErrorTypes.Duplicate,
        message: 'This -email- address is taken.'
      }
    case 'badobj':
      return {
        type: ErrorTypes.Syntax,
        message: 'Invalid object submitted.'
      }
    case 'badpw':
      return {
        type: ErrorTypes.Authentication,
        message: 'Incorrect password.'
      }
    default:
      return {
        type: ErrorTypes.Default,
        message: 'Some sort of error has occurred.'
      }
  }
}