import express from 'express'
import { UserModel } from '../models/UserModel'
import { createResponseObject, setSuccessResponse } from '../handlers/responseHandlers'
import { createValidationObject } from '../handlers/validationHandlers'
import { runValidation } from '../validators/runValidation'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'User Routes' )
})

router.post( '/add', async ( req, res ) => {
	const responseObject: any = createResponseObject()

	// validation engine
	await runValidation( createValidationObject( responseObject, req.body ), {
		required: [ 'email', 'password' ],
		unique: { model: UserModel, fields: [ 'email' ]}
	})

	if ( responseObject.errors.length === 0 ) {
		const { email, password } = req.body
		responseObject.data = new UserModel({ email, password })
		setSuccessResponse( responseObject, 201 )
		// responseObject.data.save()
	}
	res.status( responseObject.statusCode ).json( responseObject )
})

export { router as UserRouter }