const mongoose=require('mongoose')

const hotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    address: {
        street: String,
        city: { type: String, required: true },
        state: String,
        country: { type: String, required: true },
        zipCode: String,
    },
    starRating: {
        type: Number,
        min: 1,
        max: 5,
    },
},
{ timestamps: true }
)
module.exports=mongoose.model('Hotel',hotelSchema)