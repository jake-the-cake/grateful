import bcrypt from 'bcryptjs'
import { createErrorLog } from '../handlers/errorLogHandlers'

export const useHashData = ( data: any ) => {
  if ( typeof data !== 'object' ) return createErrorLog( 'badobj' )
  const promisedData: any[] =  []
  Object.entries( data ).forEach(([ k, v ]) => {
    promisedData.push(
      new Promise( function ( resolve, reject ) {
        try {
          bcrypt.genSalt( 10, function ( err, salt ) {
            if ( err ) return err
            bcrypt.hash( v as string, salt, function ( err, hash ) {
              if ( err ) return err
              resolve({[ k ]: hash })
            })
          })
        }
        catch ( err ) {
          reject( err )
        }
      })
    )
  })
  return Promise.all( promisedData )
}

type CompareProps = (
  submittedPassword: string,
  storedPassword: string
) => Promise<boolean> 

export const useCompareHash: CompareProps = ( submittedPassword, storedPassword ) => {
  return new Promise( function ( resolve, reject ) {
    try {
      bcrypt.compare( submittedPassword, storedPassword, function ( err, res ) {
        if ( err ) reject( err )
        resolve( res )
      })
    }
    catch ( err ) {
      reject( err )
    }
  })
}