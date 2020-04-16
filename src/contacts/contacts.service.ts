import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { GetUserContactsDTO, CreateContactDTO, GetUserRecentContactsDTO } from './dto/contacts.dto';
import users from "../config/users";
import { Contact } from './interfaces/contact.interface';
import { Model } from 'mongoose';
import config from "../config/app";

@Injectable()
export class ContactsService {
    constructor(@InjectModel('Contact') private readonly contactModel: Model<Contact>) {}


    async storeContact(contact: CreateContactDTO) {
        try {
            // The user is authorized to see this endpoint
            const user = users.find(user => user.deviceToken == contact.deviceToken);
            const newContact = new this.contactModel(contact);
            newContact.userDeviceToken = contact.deviceToken;
            newContact.userId = user.id;
            newContact.relationId = Math.floor((Math.random() * 20) + 1).toString();
            newContact.accountId = Math.floor((Math.random() * 20) + 1).toString();
            const createdContact = await newContact.save();
            return this.formatCreateContactResponse("Contact successfully saved", createdContact);
        } catch (error) {   
            const {message, errors} = error; 
           return this.formatErrors(message, errors);
        }
    }

    async getUserContacts(userContactDTO: GetUserContactsDTO) {
        try {
            // The user is authorized to see this endpoint
            const user = users.find(user => user.deviceToken == userContactDTO.deviceToken);
            const {pageNum} = userContactDTO;
            const {defaultPagination} = config;
            const contacts = await this.contactModel.find({userDeviceToken: user.deviceToken})
                                    .limit(defaultPagination)
                                    .skip(defaultPagination * (Number(pageNum) - 1))
                                    .sort({createdAt: -1});
            return this.formatUserContactsReponse('User contacts', contacts);
        } catch (error) {
            return this.formatErrors('Error occured', error)
        }
    }

    async getUserRecentContacts(userRecentContactsDTO: GetUserRecentContactsDTO) {
        try {
            // The user is authorized to see this endpoint
            const contacts = await this.contactModel
                                .find({userDeviceToken: userRecentContactsDTO.deviceToken})
                                .sort({createdAt: -1})
                                .limit(5);
    
            return this.formatRecentContactsResponse('User last 5 Contacts added', contacts); 
        } catch (error) {
            this.formatErrors('Error', error)
        }
    }

    formatRecentContactsResponse(message, data) {
        return {
            statusCode: 200,
            message,
            data: this.formatRecentContactsResponseData(data)
        }
    }

    formatRecentContactsResponseData(contacts) {
        return contacts.map(contact => {
            return {
                'created_ts': contact.createdAt,
                userId: contact.userId,
                email: contact.email,
                firstName: contact.firstName,
                lastName: contact.lastName,
                mobileNumber: contact.mobile,
            }
        })
    }

    formatUserContactsReponse(message, contacts) {
        return {
            statusCode: 200,
            message,
            data: this.formatUserContactsData(contacts)
        }
    }

    formatUserContactsData(contacts) {
        return contacts.map(contact => {
            return {
                createdAt: contact.createdAt,
                firstName: contact.firstName,
                lastName: contact.lastName,
                userId: contact.userId,
                contactId: contact.contactId,
                relationId: contact.rcontactationId,
                mobileNumber: contact.mobile,
                email: contact.email
            }
        })
    }

    formatCreateContactResponse(message, contact) {
        return {
            statusCode: HttpStatus.OK,
            message,
            data: this.formatCreatedContact(contact)
        }
    }

    formatCreatedContact(contact) {
        const {email, relationId, accountId, userId, firstName, lastName, mobile} = contact;
        return {
            email,
            relationId, 
            accountId,
            userId,
            firstName,
            lastName,
            mobileNumber: mobile
        }
    }

    formatErrors(message, errors) {
        return {
            statusCode: 400,
            message,
            errors
        }
    }

}
