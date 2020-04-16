import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { validCreateContactRequest } from './../config/tests.requests';

describe('Contacts Controller', () => {
  let controller: ContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });


  describe('Contacts', () =>{
    it('Should Store User Contact', () => {
      expect(controller.addNewContact(validCreateContactRequest)).toBe(HttpStatus.OK);
    });

    it('Should Find User Contacts', () => {
      expect(true).toBe(true);
    })
  })
});
