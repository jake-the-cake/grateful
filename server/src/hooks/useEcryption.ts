import bcrypt from 'bcryptjs'

export const useHashData = ( data: any ) => {

  const hashedObject: any = {}

  return hashedObject
  //  new Promise( function ( resolve, reject ) {
  //   const hashedObject: any = {}
  //   if ( typeof data !== 'object' ) {
  //     reject( 'Must send an object.' )
  //   }
  //   else {
  //     bcrypt.genSalt(10, (err, salt) => {
  //       if(err) return err;
  //       Object.entries( data ).forEach( item => {
  //         console.log( item )
  //         bcrypt.hash( item[ 1 ] as string, salt, (err, hash) => {
  //           console.log( hash )
  //           if(err) return err;
  //           hashedObject[ item[ 0 ] as string ] = hash;
  //           resolve( hashedObject )
  //         })
  //       })
  //       // hashedObject[ item[ 0 ]] = item[ 1 ]
  //     })
  //   }
  // })
}