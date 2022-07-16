const mongoose =require('mongoose');
const mongoURL= "mongodb_url"
const connectToMongo=()=>{
    mongoose.connect(mongoURL ,{
        
    }).then( ()=>{
        console.log("connected!")
    }).catch((err)=>console.log('error',err));
}
module.exports=connectToMongo;
