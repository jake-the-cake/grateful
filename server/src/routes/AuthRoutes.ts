import express from 'express'
import { UserModel } from '../models/UserModel'
import { createResponseObject } from '../handlers/responseHandlers'
import { createErrorLog } from '../handlers/errorLogHandlers'
import jwt from 'jsonwebtoken'
import { useHashData } from '../hooks/useEcryption'
import { useSignedToken } from '../hooks/useToken'

const router = express.Router()

router.get( '/test', async ( req, res ) => {
  const hashedData = await useHashData({ data: 'data', more: 'more data' })
  res.json( hashedData )
})

router.route( '/' )
  .get(( req, res ) => res.status( 200 ).send( 'Auth routes' ))
  .all(( req, res ) => res.status( 403 ).json( createErrorLog( 'x' )))

router.post( '/login/init', async ( req, res ) => {
  const responseObject: any = createResponseObject()
  
  const user: any[] = await UserModel.find({ email: req.body.email })
  if ( user.length > 0 ) {
    const u = user[ 0 ]
    if ( req.body.password === u.password ) {
      const accessToken = useSignedToken({ id: u._id }, 'access' )
      const refreshToken = useSignedToken({ id: u._id }, 'refresh' )
      responseObject.statusCode = 201
      responseObject.success = true
      responseObject.data = { ...user[ 0 ]._doc, accessToken }
      responseObject.errors = null
    }
    else {
      responseObject.statusCode = 401
      responseObject.errors.push( createErrorLog( 'badpw' ))
      responseObject.data = null
    }
  }
  else {
    responseObject.statusCode = 404
    responseObject.error = createErrorLog( '404user' )
    responseObject.data = null
  }
  res.status( responseObject.statusCode ).json( responseObject )
})

export { router as AuthRouter }