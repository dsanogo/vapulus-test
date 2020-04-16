import { GetUserContactsDTO, GetUserRecentContactsDTO } from './dto/contacts.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateContactDTO } from "./dto/contacts.dto"
import { ContactsService } from "./contacts.service";

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactService: ContactsService) {}

    // Add new User Contact
    @Post('addContacts')
    @HttpCode(HttpStatus.OK)
    addNewContact(@Body() createContactDTO: CreateContactDTO) {
        return this.contactService.storeContact(createContactDTO);
    }

    // Get all User Contacts
    @Post('getList')
    @HttpCode(HttpStatus.OK)
    findUserContacts(@Body() userContactsDto: GetUserContactsDTO) {
        return this.contactService.getUserContacts(userContactsDto);
    }

    // Get latest transactions with User Contacts
    @Post('getRecentList')
    @HttpCode(HttpStatus.OK)
    recentContacts(@Body() recentContactDTO: GetUserRecentContactsDTO) {
        return this.contactService.getUserRecentContacts(recentContactDTO);
    }
    
}
