const bcrypt = require('bcryptjs')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncHandler = require('express-async-handler')

class user{
    getAllUsers=asyncHandler(async(req,res)=>{
        const features=new ApiFeatures(User.find().select('firstName lastName email profilePicture createdAt role phone isBlocked'),req.query,'user') 
            .search()
            .filter()
            .paginate()
            .sort()
        const users =await features.query
        res.status(200).json({
            status:'success',
            totalResults:users.length,
            pagination:{
                page:Number(req.query.page)||1,
                limit:Number(req.query.limit)||20
            }
        })
    })
    getOneUser=asyncHandler(async(req))
}