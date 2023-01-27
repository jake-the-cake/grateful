import express from 'express'
import { UserModel } from '../models/UserModel'
import { runValidation } from '../validators/runValidation'
import { useHashData } from '../hooks/useEcryption'
import { goatTail } from 'quiggle'

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

router.post( '/add', async ( req: any, res ) => {
	// validation engine
	await runValidation( { response: req.responseObject, request: req.body }, {
		required: [ 'email', 'password' ],
		unique: { model: UserModel, fields: [ 'email' ]}
	})
	// deconstruct variables
	const { responseObject, body } = req
	const { email, password } = body
	console.log( responseObject )
	if ( responseObject.errors.length === 0 ) {
		let dataObject = { email }
		const dataResponse: any = await useHashData({ password })
		if ( Object.keys( dataResponse ).length ) {
			dataResponse.forEach(( data: any ) => {
				dataObject = {
					...dataObject,
					...data
				}
			})
		}
		responseObject.data = new UserModel( dataObject )
		goatTail.setDataResponse( responseObject, 201 )
		responseObject.data.save()
	}
	res.status( responseObject.statusCode ).json( responseObject )
})

export { router as UserRouter }