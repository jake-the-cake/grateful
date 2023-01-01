import express from 'express'
import { createResponseObject, setSuccessResponse } from '../handlers/responseHandlers'
import { GratitudeModel } from '../models/GratitudeModel'
import { checkForEmptyFields } from '../validators/submissionValidators'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'Gratitude Routes' )
})

router.post( '/add', ( req, res ) => {
  const responseObject: any = createResponseObject()

  checkForEmptyFields( responseObject, req.body, [ 'note', 'user' ])

  if ( responseObject.errors.length === 0 ) {
    responseObject.data = new GratitudeModel({
      user: req.body.user,
      note: req.body.note,
      votes: 0,
      reports: 0
    })
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