import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";
export class CreateContactDTO {

    @IsNotEmpty({message: "The email field is required"})
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty({message: "The mobile number is required"})
    @IsString()
    readonly mobile: string;

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty({message: "Please provide with the authorization token"})
    @IsString()
    readonly authorization: string;

    @IsNotEmpty({message: "Please provide with the device token"})
    @IsString()
    readonly deviceToken: string;

    @IsNotEmpty({message: "Please provide with the finger print value"})
    @IsString()
    readonly fingerPrint: string;
}

export class GetUserContactsDTO {

    @IsNotEmpty({message: "Please specify the page number"})
    @IsString()
    readonly pageNum: string;

    @IsOptional()
    @IsString()
    readonly character: string;

    @IsNotEmpty({message: "Please provide with the authorization token"})
    @IsString()
    readonly authorization: string;

    @IsNotEmpty({message: "Please provide with the device token"})
    readonly deviceToken: string;
    
    @IsNotEmpty({message: "Please provide with the finger print value"})
    readonly fingerPrint: string;
}

export class GetUserRecentContactsDTO {
    @IsNotEmpty({message: "Please provide with the authorization token"})
    @IsString()
    readonly authorization: string;
    
    @IsNotEmpty({message: "Please provide with the device token"})
    readonly deviceToken: string;
    
    @IsNotEmpty({message: "Please provide with the finger print value"})
    readonly fingerPrint: string;
}