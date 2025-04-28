import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAppLibraryDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    icon: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isPublic: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdById: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    buyers: string[];

}