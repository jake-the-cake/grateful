import { ResponseObjectProps } from "./responseTypes";

export type ValidationReqResProps = {
	response: ResponseObjectProps
	request: any
}

export type ValidationProps = (
	objects: ValidationReqResProps,
	data: any
) => Promise<any>

export type ValidationCheckListProps = (
	objects: ValidationReqResProps,
	checks: string[]
) => void

export type ValidateByFieldProps = (
	objects: ValidationReqResProps,
	data: {
		model: any
		fields: string[]
	}
) => Promise<any>