require('dotenv').config();
const express= require ('express');
const connectToDB=require('./database/db.js');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT= process.env.PORT || 3000;


//connect to database
connectToDB();

//middleware ->express
app.use(express.json());

//routes here
app.use('/api/books', bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`);
});

