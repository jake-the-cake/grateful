import { createErrorLog } from "../handlers/errorLogHandlers"
import jwt from "jsonwebtoken"
// import dotenv from 'dotenv'

// dotenv.config()

export const useSignedToken = ( data: any, type: string ) => {
	let token: any
	switch ( type ) {
		case 'access':
			token = jwt.sign( data, process.env.ACCESS_HUSH as string, { expiresIn: 10000 } )
			return token
		case 'refresh':
			token = jwt.sign( data, process.env.REFRESH_HUSH as string, { expiresIn: 60000 } )
			return token
		default:
			return createErrorLog( 'unknown' )
	}
}