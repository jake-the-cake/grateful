import bcrypt from 'bcryptjs'

export const useHashData = ( data: any ) => {
  return new Promise( function ( resolve, reject ) {
    if ( typeof data !== 'object' ) {
      reject( 'Must send an object.' )
    }
    else {
      const hashedObject = {}
      Object.entries( data ).forEach( item => {
        
        resolve( hashedObject )
      })
    }
  })
}