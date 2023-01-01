import express from 'express'

const router = express.Router()

router.get( '/', ( req, res ) => {
	res.send( 'User Routes' )
})

export { router as UserRouter }