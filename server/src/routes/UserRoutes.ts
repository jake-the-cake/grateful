import express from 'express'
import { UserModel } from '../models/UserModel'
import { createResponseObject, setSuccessResponse } from '../handlers/responseHandlers'
import { createValidationObject } from '../handlers/validationHandlers'
import { runValidation } from '../validators/runValidation'
import { useHashData } from '../hooks/useEcryption'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'User Routes' )
})

router.get( '/find/all', async ( req, res ) => {
	const response = await UserModel.find()
	res.status( 200 ).json( response )
})

router.delete( '/delete/all', async ( req, res ) => {
	Array.from( await UserModel.find() ).forEach( user => {
		user.delete()
	})
	res.status( 201 ).json({ "all users": "deleted." })
})

router.post( '/add', async ( req, res ) => {
	const responseObject: any = createResponseObject()

	// validation engine
	await runValidation( createValidationObject( responseObject, req.body ), {
		required: [ 'email', 'password' ],
		unique: { model: UserModel, fields: [ 'email' ]}
	})

	if ( responseObject.errors.length === 0 ) {
		let dataObject = {}
		const dataResponse: any = await useHashData( req.body )
		if ( Object.keys( dataResponse ).length ) {
			dataResponse.forEach(( data: any ) => {
				dataObject = {
					...dataObject,
					...data
				}
			})
		}
		responseObject.data = new UserModel( dataObject )
		setSuccessResponse( responseObject, 201 )
		responseObject.data.save()
	}
	res.status( responseObject.statusCode ).json( responseObject )
})

export { router as UserRouter }