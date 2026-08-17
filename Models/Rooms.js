// Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        hotel: { type: mongoose.Schema.Types.ObjectId, 
            ref: 'Hotel', 
            required: true },

        roomType: { type: String, 
            required: true },
//'Standard', 'Deluxe', 'Suite'
        pricePerNight: { type: Number, 
            required: true },
        capacity: {
        adults: { type: Number, default: 1 },
        children: { type: Number, default: 0 },
        },
        bedType: String, // 'King', 'Queen', 'Twin'
        totalRooms: { type: Number, 
            required: true, 
            default: 1 }, // how many of this room type exist
        amenities: [String], // 'AC', 'TV', 'minibar', 'balcony'
        images: [String],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
    );

module.exports = mongoose.model('Room', roomSchema);