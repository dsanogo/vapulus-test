import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { validCreateContactRequest, getUserContactListReq, invalidCreateContactRequest } from './../config/tests.requests';
import { ContactsService } from './contacts.service';
jest.mock("./contacts.service");


const expectedCreateResult = {
  "statusCode": 200,
  "message": "Contact successfully saved",
  "data": {
      "email": "m.elhadidi@vapulus.com",
      "relationId": "5",
      "accountId": "18",
      "userId": "2",
      "firstName": "Moustafa",
      "lastName": "El-Hadidi",
      "mobileNumber": "01143255761"
  }
};

const expectedUserListResult = 
    {
      "statusCode": 200,
      "message": "User contacts",
      "data": [
          {
              "createdAt": "2020-04-16T14:31:33.955Z",
              "firstName": "Moustafa",
              "lastName": "El-Hadidi",
              "userId": "2",
              "mobileNumber": "01143255761",
              "email": "m.elhadidi@vapulus.com"
          }
      ]
    } 

const expectedRecentContactResult = {
  "statusCode": 200,
  "message": "User last 5 Contacts added",
  "data": [
      {
          "created_ts": "2020-04-16T14:31:33.955Z",
          "userId": "2",
          "email": "m.elhadidi@vapulus.com",
          "firstName": "Moustafa",
          "lastName": "El-Hadidi",
          "mobileNumber": "01143255761"
      }
  ]
}

const unauthorisedResult = {
  "statusCode": 401,
  "message": "Not Authorized",
  "error": "Invalid Authentication"
}

describe('Contacts Controller', () => {
  let controller: ContactsController;
  let contactsService: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService]
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    contactsService = module.get<ContactsService>(ContactsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  describe('Contacts', () =>{
    it('Should Store User Contact', async  () => {
        jest.spyOn(contactsService, "storeContact").mockResolvedValue(expectedCreateResult);
        expect(await controller.addNewContact(validCreateContactRequest)).toBe(expectedCreateResult);
    });

    it('Should Find User Contacts', async () => {
      jest.spyOn(contactsService, 'getUserContacts').mockResolvedValue(expectedUserListResult);
      expect(await controller.findUserContacts(getUserContactListReq)).toBe(expectedUserListResult);
    })

    it('Should Find User Recent Contacts', async () => {
      jest.spyOn(contactsService, 'getUserRecentContacts').mockResolvedValue(expectedRecentContactResult);
      expect(await controller.recentContacts(getUserContactListReq)).toBe(expectedRecentContactResult);
    })

    it("Should throw UnAuthorizedExecption if user not authenticated", async (done) => {

      jest.spyOn(contactsService, "storeContact").mockRejectedValue(unauthorisedResult);
      await controller.addNewContact(invalidCreateContactRequest)
       .then(() => done.fail("Should return an unauthencated response"))
       .catch((error) => {
         expect(error.statusCode).toBe(HttpStatus.UNAUTHORIZED);
         expect(error.message).toBe("Not Authorized");
         expect(error.error).toBe("Invalid Authentication");
         done();
       });
    });
  })
});
