import products from './data/products.js'
import users from './data/users.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import colors from 'colors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB() 

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUserId = createdUsers[0]._id

        const sampleProducts = products.map(p =>({...p, user: adminUserId}))

        await Product.insertMany(sampleProducts)
        console.log('Data imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}


const deleteData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

      
        console.log('Data deleted'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(error.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    deleteData()
} else {
    importData()
}