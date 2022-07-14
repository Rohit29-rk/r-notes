const mongoose =require('mongoose');
const mongoURL="mongodb+srv://rohit29:rohit@29@cluster0.k2zjz.mongodb.net/rnotebook?retryWrites=true&w=majority"
const connectToMongo=()=>{
    mongoose.connect(mongoURL , ()=>{
        console.log("connected!")
    })
}
module.exports=connectToMongo;