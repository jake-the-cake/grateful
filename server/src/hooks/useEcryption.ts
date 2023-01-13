import bcrypt from 'bcryptjs'
// import c from 'crypto'
import { createErrorLog } from '../handlers/errorLogHandlers'

export const useHashData = ( data: any ) => {
  if ( typeof data !== 'object' ) return createErrorLog( 'badobj' )
  const promisedData: any[] =  []
  Object.entries( data ).forEach(([ k, v ]) => {
    promisedData.push(
      new Promise( function ( resolve, reject ) {
        bcrypt.genSalt( 10, function ( err, salt ) {
          bcrypt.hash( v as string, salt, function ( err, hash ) {
            resolve({[ k ]: hash })
          })
        })
      })
    )
  })
  return Promise.all( promisedData )
}

export const useCompareHash = ( submittedPassword: string, storedPassword: string ) => {
  bcrypt.compare( submittedPassword, storedPassword, function ( err, res ) {
    if ( err ) return err.message
    return res
  })
}

type StringInStringOut = ( text: string ) => string

export const encodeString: StringInStringOut = function ( text ) {
  return text + ' <-- without encoding'
}