import { createErrorLog } from "../handlers/errorLogHandlers"
import { ResponseObjectProps } from "../types/responseTypes"

export type CheckForEmptyFieldsProps = (
	object: ResponseObjectProps,
	request: any,
	checks: string[]
) => void

export const checkForEmptyFields: CheckForEmptyFieldsProps = ( object, request, checks ) => {
	if ( object.errors === null ) object.errors = []
	checks.forEach( check => {
		switch ( request[ check ] ) {
			case undefined:
				object.errors!.push( createErrorLog( `no${ check }` ) )
				object.statusCode = 401
				break
			default:
				break
		}
	})
}