const mongoose = require('mongoose');

const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Database Connected Successfully!');
        
    }catch(error){
        console.log('Unable to connect to the MongoDB Database!',error);
        process.exit(1);
        
    }
}

module.exports = connectToDB;