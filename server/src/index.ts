import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { GratefulModel } from './models/GratefulModel'

const app = express()
dotenv.config()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))


enum ErrorTypes {
    Required = 'Required',
    Default = 'DefaultErrorMessage'
} 

interface ErrorLogProps {
  type: ErrorTypes,
  message: string,
}

export const createErrorLog: ( errorCode: string ) => ErrorLogProps = ( errorCode ) => {
  switch ( errorCode ) {
    case 'nouser':
      return {
        type: ErrorTypes.Required,
        message: 'A -user- ID was not provided.'
      }
    case 'nonote':
      return {
        type: ErrorTypes.Required,
        message: 'A -note- was not provided.'
      }
    default:
      return {
        type: ErrorTypes.Default,
        message: 'Some sort of error has occurred.'
      }
  }
}

export const createResponseObject = () => {
  return {
    statusCode: 500,
    success: false,
    data: null,
    errors: []
  }
} 

app.get( '/', ( req, res ) => {
  res.send( 'home' )
})

app.post( '/add', ( req, res ) => {
  const responseObject: any = createResponseObject()
  console.log( req.body )
  switch ( req.body.user ) {
    case undefined:
      responseObject.errors.push( createErrorLog( 'nouser' ) )
      responseObject.statusCode = 401
      break
    default:
      break
  }

  switch ( req.body.note ) {
    case undefined:
      responseObject.errors.push( createErrorLog( 'nonote' ))  
      responseObject.statusCode = 401
      break
    default:
      break
  }

  if ( responseObject.errors.length === 0 ) {
    responseObject.data = new GratefulModel({
      user: req.body.user,
      note: req.body.note,
      votes: 0,
      reports: 0
    })
    responseObject.statusCode = 201
    responseObject.success = true
    responseObject.errors = null
    responseObject.data.save()
  }

  res.status( responseObject.statusCode ).json( responseObject )
})

app.get( '/view', async ( req, res ) => {
  const grats = await GratefulModel.find()
  res.json( grats )
})

app.listen( 4200, () => {
  console.log( 'running' )
  mongoose.set('strictQuery', false)
  mongoose.connect( 'mongodb://localhost:27017/grateful', () => {
    console.log( 'data' )
  })
})