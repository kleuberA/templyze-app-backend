import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUser extends User {

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: "Name is too short!" })
    @MaxLength(20, { message: "Name is too long!" })
    name: string

    @ApiProperty()
    @IsEmail({}, { message: "Invalid email!" })
    email: string;

    @ApiProperty()
    @IsString({ message: "Invalid password!" })
    @MinLength(8, { message: "Password is too short!" })
    @MaxLength(20, { message: "Password is too long!" })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password is too weak!" })
    password: string;

}