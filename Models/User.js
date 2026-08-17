// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {type: String,
            required: true,
            minlength: 6,
            select: false
        },
        phone: {
            type: String,
            match: [/^\+?[0-9]{7,15}$/, 'Please enter a valid phone number'],
        },
        role: { type: String,
            enum: ['user', 'hotelOwner', 'admin'],
            default: 'user'
        },
        isActive: { type: Boolean, default: true },
        avatar: String,
        nanational_ID: String,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);