import { ResponseObjectProps } from "../types/responseTypes"
import { ValidationReqResProps } from "../types/validationTypes"

export const createValidationObject = ( response: ResponseObjectProps, request: any ): ValidationReqResProps => {
  return { response, request }
}