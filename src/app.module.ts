import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';
import config from './config/app';

import { MongooseModule } from "@nestjs/mongoose";
import { ContactsModule } from './contacts/contacts.module';
import { ContactSchema } from './contacts/schemas/contact.schema';

@Module({
  imports: [
    ContactsModule, 
    MongooseModule.forRoot(config.mongoURI,  { useUnifiedTopology: true, useNewUrlParser: true}),
    MongooseModule.forFeature([{
    name: "Contact",
    schema: ContactSchema
  }])],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactsService],
})

export class AppModule{}
