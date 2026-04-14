const mongoose = require("mongoose");

async function  connectDB(){
 await  mongoose.connect("mongodb+srv://Mahesh:<db_password>@cluster0.nzs4id0.mongodb.net/DevTinder")
     
}
connectDB().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error connecting to database",err);
})