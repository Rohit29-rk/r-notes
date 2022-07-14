const mongoose =require('mongoose');
const mongoURL= "mongodb+srv://rohit29:rohit@cluster0.k2zjz.mongodb.net/rnotebook?retryWrites=true&w=majority"
const connectToMongo=()=>{
    mongoose.connect(mongoURL ,{
        
    }).then( ()=>{
        console.log("connected!")
    }).catch((err)=>console.log('error',err));
}
module.exports=connectToMongo;