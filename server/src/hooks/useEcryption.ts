import bcrypt from 'bcryptjs'
import C from 'cryptr'
import { createErrorLog } from '../handlers/errorLogHandlers'
import dotenv from 'dotenv'
dotenv.config()

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

// type StringInStringOut = ( text: string ) => string

// export const encodeString: StringInStringOut = function ( text ) {
//   return new C( process.env.CRYPT_HUSH as string ).encrypt( text )
//   // return text + ' <-- without encoding'
// }

type EncryptStringProps = (
  text: string,
  type: string
) => string

export const cryptString: EncryptStringProps = ( text, type ) => {
  const newText = new C( process.env.CRYPT_HUSH as string )
  switch ( type ) {
    case 'en':
      return newText.encrypt( text )
    case 'de':
      return newText.decrypt( text )
    default:
      return text
  }
}