import { AuthMiddleware } from './../middleware/auth.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsController } from "./contacts.controller"
import { ContactsService } from "./contacts.service"
import { ContactSchema } from "./schemas/contact.schema";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])],
  controllers: [ContactsController],
  providers: [ContactsService],
})

export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('contacts')
  }
}
