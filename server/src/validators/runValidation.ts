import { ValidationProps } from "../types/validationTypes";
import { checkForEmptyFields, checkForExisting } from "./submissionValidators";

export const runValidation: ValidationProps = ( objects, data ) => {
	const checks = new Promise(( resolve, reject ) => {
		if ( data.unique ) resolve( checkForExisting( objects, data.unique ))
		else resolve( true )
	})
	if ( data.required ) checkForEmptyFields( objects, data.required )
	return checks
}