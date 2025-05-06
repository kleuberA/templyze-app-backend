import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class UserAppInfoByIdEntity {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;

    @ApiProperty()
    @IsString({ each: true })
    purchases: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        appId: string;
        customName: string | null;
    }[];
}
