import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { validCreateContactRequest } from './../config/tests.requests';


describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsService],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service.storeContact(validCreateContactRequest)).toBe(HttpStatus.OK);
  });
});
