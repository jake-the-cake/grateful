import express from 'express'
import { createValidationObject } from '../handlers/validationHandlers'
import { runValidation } from '../validators/runValidation'
import { createResponseObject, setSuccessResponse } from '../handlers/responseHandlers'
import { GratitudeModel } from '../models/GratitudeModel'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'Gratitude Routes' )
})

router.post( '/add', ( req, res ) => {
  const responseObject: any = createResponseObject()
  runValidation( createValidationObject( responseObject, req.body ), {
    required: [ 'note', 'user' ]
  })

  if ( responseObject.errors.length === 0 ) {
    const { user, note } = req.body
    responseObject.data = new GratitudeModel({ user, note, votes: 0, reports: 0 })
    setSuccessResponse( responseObject, 201 )
    responseObject.data.save()
    // responseObject.errors.push( createErrorLog( 'server' ))
  }

  res.status( responseObject.statusCode ).json( responseObject )
})

router.get( '/view', async ( req, res ) => {
  const grats = await GratitudeModel.find()
  res.json( grats )
})

export { router as GratitudeRouter }