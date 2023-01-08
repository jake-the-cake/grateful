import { appSettings } from "../data/appSettings"

export type ApiCallProps = (
  method: string,
  url: string,
  data?: any
) => any

export const useFetch: ApiCallProps = ( method, url, data ) => {
  const baseUrl = appSettings.api.baseUrl
  return fetch( baseUrl + url, {
    method,
    mode: data.mode ?? 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...data.headers
    },
    body: JSON.stringify( data.body )
  })
}