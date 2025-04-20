import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUser {

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(3, { message: "Name is too short!" })
    @MaxLength(20, { message: "Name is too long!" })
    name?: string

    @ApiProperty()
    @IsOptional()
    @IsEmail({}, { message: "Invalid email!" })
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: "Invalid password!" })
    @MinLength(8, { message: "Password is too short!" })
    @MaxLength(20, { message: "Password is too long!" })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password is too weak!" })
    password?: string;

}