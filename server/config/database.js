const mongoose = require('mongoose')
require('dotenv').config()

exports.dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.PORT_URL)

    }catch(err){
        console.log("Issue In DB Connection !!!")
        console.log(err.message)
        process.exit(1);
    }

}
