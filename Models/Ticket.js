const mongoose = require('mongoose');

const mongoose = require('mongoose');
const crypto = require('crypto');

const bookingSchema = new mongoose.Schema(
    {
        confirmationCode: {
        type: String,
        unique: true, // e.g. "BK-7F3A9C21"
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Hotel', 
            required: true 
        },
        room: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Room', 
            equired: true 
        },
        checkIn: { 
            type: Date, 
            required: true 
        },
        checkOut: { 
            type: Date, 
            required: true 
        },
        guests: {
        adults: { type: Number, default: 1 },
        children: { type: Number, default: 0 },
        },
        numberOfRooms: { 
            type: Number, 
            default: 1 
        },
        totalPrice: { 
            type: Number, 
            required: true 
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid', 'refunded'],
            default: 'unpaid',
        },
        specialRequests: String,
    },
    { timestamps: true }
);

// Auto-generate a unique confirmation code on creation
bookingSchema.pre('save', function (next) {
    if (!this.isNew) return next();
    const random = crypto.randomBytes(4).toString('hex').toUpperCase();
    this.confirmationCode = `BK-${random}`;
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);