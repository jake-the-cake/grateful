import mongoose from 'mongoose'

const Grateful = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  note: String,
  votes: Number,
  reports: Number
},
{ timestamps: true })

export const GratitudeModel = mongoose.model( 'Grateful', Grateful )