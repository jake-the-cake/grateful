import express, { Request } from 'express'
import { createValidationObject } from '../handlers/validationHandlers'
import { runValidation } from '../validators/runValidation'
import { createResponseObject, setSuccessResponse } from '../handlers/responseHandlers'
import { GratitudeModel } from '../models/GratitudeModel'
import { createErrorLog } from '../handlers/errorLogHandlers'

const router = express.Router()

const models: any = {
  gratitude: GratitudeModel
}

const getDataByUser: any = async ( req: any, res: any, next: any ) => {
  const routePath = req.baseUrl.replace( '/', '' )
  const userId = req.body.id
  req.data = await models[ routePath ].find({ user: userId })
  next()
  // console.log( data )
  // res.send( 'check terminal' )
}

router.route( '/find/byuser' )
  .get( getDataByUser, (req:any,res) => {
    res.send(req.data)
  })


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
    required: [ 'user' ]
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

// admin only routes
router.route( '/find/all' )

export { router as GratitudeRouter }