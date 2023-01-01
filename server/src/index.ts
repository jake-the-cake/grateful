import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRoutes'
import { GratitudeRouter } from './routes/GratitudeRoutes'

const app = express()
dotenv.config()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

app.use( '/user', UserRouter )
app.use( '/gratitude', GratitudeRouter )

app.get( '/', ( req, res ) => {
  res.send( 'home' )
})

app.listen( 4200, () => {
  console.log( 'running' )
  mongoose.set('strictQuery', false)
  mongoose.connect( 'mongodb://localhost:27017/grateful', () => {
    console.log( 'data' )
  })
})