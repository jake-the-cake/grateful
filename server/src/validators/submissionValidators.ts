import { ValidateByFieldProps, ValidationCheckListProps } from "../types/validationTypes"
import { createErrorLog } from "../handlers/errorLogHandlers"

export const checkForEmptyFields: ValidationCheckListProps = ( { response, request }, checks ) => {
	if ( response.errors === null ) response.errors = []
	checks.forEach( check => {
		switch ( request[ check ] ) {
			case undefined:
				response.errors!.push( createErrorLog( `no${ check }` ) )
				response.statusCode = 401
				break
			default:
				break
		}
	})
}

export const checkForExisting: ValidateByFieldProps = ({ response, request }, { model, fields }) => {
	const check = new Promise(( resolve, reject ) => {
		fields.forEach( async ( field ) => {
			const query = await model.find({[ field ]: request[ field ]})
			if ( query.length > 0 ){
				response.statusCode = 403
				resolve( response.errors?.push( createErrorLog( `dup${ field }` )))
			}
			else resolve( true )
		})
	})
	return check
}