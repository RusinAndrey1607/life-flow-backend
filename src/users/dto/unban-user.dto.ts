import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class UnBanUserDto{
    @ApiProperty({ example: '1', description: 'User id' })
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}