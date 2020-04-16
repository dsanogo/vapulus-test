import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { GetUserContactsDTO, CreateContactDTO, GetUserRecentContactsDTO } from './dto/contacts.dto';
import users from "../config/users";
import { Contact } from './interfaces/contact.interface';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
    constructor(@InjectModel('Contact') private readonly contactModel: Model<Contact>) {}


    async storeContact(contact: CreateContactDTO) {
        try {
            // The user is authorized to see this endpoint
            const newContact = new this.contactModel(contact);
            newContact.userDeviceToken = contact.deviceToken;
            const createdContact = await newContact.save();
            return this.formatResponse("Contact successfully saved", createdContact);
        } catch (error) {   
            const {message, errors} = error; 
           return this.formatValidationErrorResponse(message, errors);
        }
    }

    async getUserContacts(userContactDTO: GetUserContactsDTO) {
        // The user is authorized to see this endpoint
        const user = users.find(user => user.deviceToken == userContactDTO.deviceToken);
        const {pageNum} = userContactDTO;
        const contacts = await this.contactModel.find({userDeviceToken: user.deviceToken})
                                .limit(5)
                                .skip((Number(pageNum) - 1 ))
                                .sort({createdAt: -1});
        return this.formatResponse('User contacts', contacts);
    }

    async getUserRecentContacts(userRecentContactsDTO: GetUserRecentContactsDTO) {
        // The user is authorized to see this endpoint
        const contacts = await this.contactModel
                            .find({userDeviceToken: userRecentContactsDTO.deviceToken})
                            .sort({createdAt: -1})
                            .limit(5);

        return this.formatResponse('User last 5 Contacts added', contacts); 
    }

    formatResponse(message, data) {
        return {
            statusCode: 200,
            message,
            data
        }
    }

    formatValidationErrorResponse(message, errors) {
        return {
            statusCode: 400,
            message,
            errors
        }
    }
}
