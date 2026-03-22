const dotenv = require("dotenv");
dotenv.config();
const {dBconnect} = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const PORT = process.env.PORT || 5000;
const { app } = require("./app");



//cloudinaryConnection
cloudinaryConnect();

dBconnect().then(() =>{
  app.listen(PORT,()=>{
    console.log(`App is running at ${PORT} PORT`)
})
})
.catch(() =>{
  console.log("SERVER HAS NOT STARTED YET!!")
})

