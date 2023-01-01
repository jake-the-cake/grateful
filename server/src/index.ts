import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRoutes'
import { GratitudeRouter } from './routes/GratitudeRoutes'
import { portInit } from './init/portInit'
import { serverNameInit } from './init/serverNameInit'

const app = express()
dotenv.config()
const port = portInit()
const serverName = serverNameInit()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

app.use( '/user', UserRouter )
app.use( '/gratitude', GratitudeRouter )

app.get( '/', ( req, res ) => {
  res.send( 'home' )
})

app.listen( port, () => {
  console.log( `'${ serverName }' server is running on port ${ port }.` )
  mongoose.set('strictQuery', false)
  mongoose.connect( process.env.MONGO as string, () => {
    console.log( 'data' )
  })
})