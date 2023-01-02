import v from 'email-validator'

export const useValidation = ( data ) => {
	// let errors: any = []
	const success = v.validate( data.email || '' )
	if ( !success ) {
	}
	return {
		success,
		errors: null
	}
}