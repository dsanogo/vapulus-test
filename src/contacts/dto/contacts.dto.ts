import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateContactDTO {

    @IsNotEmpty({message: "The email field is required"})
    @IsEmail()
    @ApiProperty({type: String, description: "Contact Email"})
    readonly email: string;

    @IsNotEmpty({message: "The mobile number is required"})
    @IsString()
    @ApiProperty({type: String, description: "Contact Mobile number"})
    readonly mobile: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Contact First name"})
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Contact Last name"})
    readonly lastName: string;

    @IsNotEmpty({message: "Please provide with the authorization token"})
    @IsString()
    @ApiProperty({type: String, description: "Authorization token"})
    readonly authorization: string;

    @IsNotEmpty({message: "Please provide with the device token"})
    @IsString()
    @ApiProperty({type: String, description: "Device Token"})
    readonly deviceToken: string;

    @IsNotEmpty({message: "Please provide with the finger print value"})
    @IsString()
    @ApiProperty({type: String, description: "User Fingerprint"})
    readonly fingerPrint: string;
}

export class GetUserContactsDTO {

    @IsNotEmpty({message: "Please specify the page number"})
    @IsString()
    @ApiProperty({type: String, description: "Page Number"})
    readonly pageNum: string;

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: "Search Character", required: false})
    readonly character?: string;

    @IsNotEmpty({message: "Please provide with the authorization token"})
    @IsString()
    @ApiProperty({type: String, description: "Authorization token"})
    readonly authorization: string;

    @IsNotEmpty({message: "Please provide with the device token"})
    @ApiProperty({type: String, description: "Device Token"})
    readonly deviceToken: string;

    @IsNotEmpty({message: "Please provide with the finger print value"})
    @ApiProperty({type: String, description: "User Fingerprint"})
    readonly fingerPrint: string;
}

export class GetUserRecentContactsDTO {
    @IsNotEmpty({message: "Please provide with the authorization token"})
    @IsString()
    @ApiProperty({type: String, description: "Authorization token"})
    readonly authorization: string;

    @IsNotEmpty({message: "Please provide with the device token"})
    @ApiProperty({type: String, description: "Device Token"})
    readonly deviceToken: string;

    @IsNotEmpty({message: "Please provide with the finger print value"})
    @ApiProperty({type: String, description: "User Fingerprint"})
    readonly fingerPrint: string;
}