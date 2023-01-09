import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRoutes'
import { GratitudeRouter } from './routes/GratitudeRoutes'
import { IndexRouter } from './routes/IndexRoutes'
import { runInits } from './init/runInits'
import { AuthRouter } from './routes/AuthRoutes'

// init and configure app
const app = express()
dotenv.config()
const { port, serverName } = runInits()

// middleware
app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

// router
app.use( '/', IndexRouter )
app.use( '/user', UserRouter )
app.use( '/gratitude', GratitudeRouter )
app.use( '/auth', AuthRouter )

// listener
app.listen( port, () => {
  console.log( `'${ serverName }' server is running on port ${ port }.` )
  mongoose.set('strictQuery', false)
  mongoose.connect( process.env.MONGO as string, () => {
    console.log( 'data' )
  })
})