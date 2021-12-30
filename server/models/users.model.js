import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone: String,
    password: String,
    names: String,
    address: String,
    admin: Boolean,
    createdAt: String
});

const userModel = mongoose.model('users', userSchema);

export default userModel
