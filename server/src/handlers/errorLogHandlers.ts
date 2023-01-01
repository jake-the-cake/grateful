import { ErrorLogProps, ErrorTypes } from "../types/errorTypes"

export const createErrorLog: ( errorCode: string ) => ErrorLogProps = ( errorCode ) => {
  switch ( errorCode ) {
    case 'nouser':
      return {
        type: ErrorTypes.Required,
        message: 'A -user- ID was not provided.'
      }
    case 'nonote':
      return {
        type: ErrorTypes.Required,
        message: 'A -note- was not provided.'
      }
    case 'server':
      return {
        type: ErrorTypes.Server,
        message: 'An internal server error has occured.'
      }
    default:
      return {
        type: ErrorTypes.Default,
        message: 'Some sort of error has occurred.'
      }
  }
}