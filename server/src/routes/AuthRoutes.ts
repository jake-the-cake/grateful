import express from 'express'
import { UserModel } from '../models/UserModel'
import { createResponseObject } from '../handlers/responseHandlers'
import { createErrorLog } from '../handlers/errorLogHandlers'
import JWT from 'jsonwebtoken'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'Auth Routes' )
})

router.post( '/login/init', async ( req, res ) => {
  const responseObject: any = createResponseObject()
  
  const user: any[] = await UserModel.find({ email: req.body.email })
  if ( user.length > 0 ) {
    const token = JWT.sign( user[ 0 ].email, process.env.HUSH_HUSH as string )
    responseObject.statusCode = 201
    responseObject.success = true
    responseObject.data = { ...user[ 0 ]._doc, token }
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