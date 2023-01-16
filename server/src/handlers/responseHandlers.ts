import { ResponseObjectProps } from "../types/responseTypes"

export const createResponseObject = () => {
  return {
    statusCode: 500,
    success: false,
    data: null,
    errors: []
  }
}

export const setSuccessResponse: ( object: ResponseObjectProps, code: number ) => ResponseObjectProps = ( object, code ) => {
  object.statusCode = code
  object.success = true
  object.errors = null
  return object
}

export const setErrorResponse: ( object: ResponseObjectProps, code: number ) => ResponseObjectProps = ( object, code ) => {
  object.data = null
  object.success = false
  object.statusCode = code
  return object
}