import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userDeviceToken: {type: String, required: true},
    userId: {type: String, required: true},
    relationId: {type: String, required: true},
    accountId: {type: String, required: true}
}, 
{
    timestamps: true
});