const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    mobileNo: { type: String, require: true },
    email: { type: String, require: true },
    otp: { type: String },
    isVerified: { type: Boolean, default: false },
    password: { type: String },
    companyDashboardDetails: { type: Object }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel