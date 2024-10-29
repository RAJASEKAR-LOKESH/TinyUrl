const mongoose=require('mongoose')

const connection=async()=>{
    await mongoose.connect(process.env.URI)
    console.log("Connected to DB")
}

module.exports=connection