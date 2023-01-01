import mongoose from 'mongoose'

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
		type: String,
		required: true
	},
  name: String
},
{ timestamps: true })

export const UserModel = mongoose.model( 'User', User )