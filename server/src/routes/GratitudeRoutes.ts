import express from 'express'
import { createValidationObject } from '../handlers/validationHandlers'
import { runValidation } from '../validators/runValidation'
import { createResponseObject, setSuccessResponse } from '../handlers/responseHandlers'
import { GratitudeModel } from '../models/GratitudeModel'
import { createErrorLog } from '../handlers/errorLogHandlers'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'Gratitude Routes' )
})

router.get( '/find/all', async ( req, res ) => {
	const response = await GratitudeModel.find()
	res.status( 200 ).json( response )
})

router.delete( '/delete/all', async ( req, res ) => {
	Array.from( await GratitudeModel.find() ).forEach( user => {
		user.delete()
	})
	res.status( 201 ).json({ "all grats": "deleted." })
})

router.post( '/add', ( req, res ) => {
  const responseObject: any = createResponseObject()
  runValidation( createValidationObject( responseObject, req.body ), {
    required: [ 'note', 'user' ]
  })

  if ( responseObject.errors.length === 0 ) {
    try {
      const { user, note } = req.body
      responseObject.data = new GratitudeModel({ user, note, votes: 0, reports: 0 })
      setSuccessResponse( responseObject, 201 )
      responseObject.data.save()
    }
    catch ( err: any ) {
      console.error( err.message )
      responseObject.errors.push( createErrorLog( 'server' ))
    }
  }
  res.status( responseObject.statusCode ).json( responseObject )
})

router.get( '/view', async ( req, res ) => {
  const grats = await GratitudeModel.find()
  res.json( grats )
})

export { router as GratitudeRouter }