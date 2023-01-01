import { ErrorLogProps, ErrorTypes } from "../types/errorTypes"

export const notProvided = ( item: string ): ErrorLogProps => {
    let message = `A -${ item }- was not provided.`
    if ( item[ 0 ].match( /^[aeiou]/ ) && item !== 'user' ) message = message.replace( 'A', 'An' )
    return { type: ErrorTypes.Required, message }
  }