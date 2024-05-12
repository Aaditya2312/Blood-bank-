const mongoose = require ('mongoose')
const colors = require ('colors')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDb database ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDb Database Error ${error}`.bgRed.white)
    }
}
module.exports = connectDb;