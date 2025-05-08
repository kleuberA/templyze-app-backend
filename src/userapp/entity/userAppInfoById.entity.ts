import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UserAppInfoByIdEntity {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @ApiProperty()
    @IsOptional()
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
