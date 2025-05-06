import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class UserApp {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    appId: string;

    @ApiProperty()
    @IsString()
    customName: string | null;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;
}