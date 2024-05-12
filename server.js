const express = require('express')
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const connectDb = require('./config/db')

//dot config
dotenv.config()

//mongoDb connection
connectDb();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


//test route
app.use('/api/v1/test', require('./routes/testRoutes'))
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'))
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'))
app.use('/api/v1/admin', require('./routes/adminRoutes'))
//server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode at ${process.env.PORT}`.bgBlue.white);
})