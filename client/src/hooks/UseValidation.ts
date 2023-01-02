import v from 'email-validator'

export const useValidation = ( data ) => {
	return { success: v.validate( data.email || '' )}
}