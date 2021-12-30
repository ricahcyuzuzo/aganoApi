import mongoose from 'mongoose';

const membersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    names: String,
    phone: String,
    createdAt: String,
});

const memberModel = mongoose.model('members', membersSchema);

export default memberModel;
