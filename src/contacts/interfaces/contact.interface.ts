import { Document } from "mongoose";

export interface Contact extends Document {
    email: string;
    mobile: string;
    firstName: string
    lastName: string;
    userDeviceToken: string;
    userId: string,
    relationId: string,
    accountId: string
}