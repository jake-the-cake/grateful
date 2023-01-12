import bcrypt from 'bcryptjs'
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

// //Checking the crypto module
// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc'; //Using AES encryption
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// //Encrypting text
// function encrypt(text: string) {
//    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Decrypting text
// function decrypt(text: string) {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
// }

// // Text send to encrypt function
// var hw = encrypt("Welcome to Tutorials Point...")
// console.log(hw)
// console.log(decrypt(hw))