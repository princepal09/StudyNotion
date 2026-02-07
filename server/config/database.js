const mongoose = require('mongoose')
require('dotenv').config()

exports.connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully!!!");


    }catch(err){
        console.log("Issue In DB Connection !!!")
        console.log(err.message)
        process.exit(1);
    }

}
