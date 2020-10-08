import  express from 'express'
// import  products from './data/products.js'
import  dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/api/products.js'
import Product from './models/productModel.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
dotenv.config()
connectDB()

const app = express()

app.get('/', (req,res) => {
    res.send('API running')
})


app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(5000, console.log(`Server is running in ${process.env.NODE_ENV} mode  on port ${PORT}`.yellow.bold))