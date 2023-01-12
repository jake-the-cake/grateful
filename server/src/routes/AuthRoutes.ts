import express from 'express'
import { UserModel } from '../models/UserModel'
import { createResponseObject } from '../handlers/responseHandlers'
import { createErrorLog } from '../handlers/errorLogHandlers'
import JWT from 'jsonwebtoken'
import { useHashData } from '../hooks/useEcryption'

const router = express.Router()

useHashData({ data: 'data', more: 'more data' }).then(( x:any ) => console.log( x ))

router.route( '/' )
  .get(( req, res ) => res.status( 200 ).send( 'Auth routes' ))
  .all(( req, res ) => res.status( 403 ).json( createErrorLog( 'x' )))

router.post( '/login/init', async ( req, res ) => {
  const responseObject: any = createResponseObject()
  
  const user: any[] = await UserModel.find({ email: req.body.email })
  if ( user.length > 0 ) {
    const accessToken = JWT.sign( { id: user[ 0 ]._id }, process.env.ACCESS_HUSH as string, { expiresIn: 10000 } )
    const refreshToken = JWT.sign( { id: user[ 0 ]._id }, process.env.REFRESH_HUSH as string, { expiresIn: 60000 } )
    responseObject.statusCode = 201
    responseObject.success = true
    responseObject.data = { ...user[ 0 ]._doc, accessToken }
    responseObject.errors = null
    console.log( responseObject )
  }
  else {
    responseObject.statusCode = 404
    responseObject.error = createErrorLog( '404user' )
    responseObject.data = null
  }
  res.status( responseObject.statusCode ).json( responseObject )
})

export { router as AuthRouter }