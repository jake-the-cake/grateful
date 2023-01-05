import mongoose from 'mongoose'

const db = new mongoose.Connection()

console.log( db )
// const x = async () => {
// 	const conn = await mongoose.createConnection('mongodb://127.0.0.1:27017/test').asPromise()
// 	console.log( conn.readyState )
// }

// x()