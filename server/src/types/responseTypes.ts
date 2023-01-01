// general object used for repsonding to API requests
export interface ResponseObjectProps {
  statusCode: number
  success: boolean
  data: any | null
  errors: any[] | null
}