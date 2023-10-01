import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class BanUserDto{
    @ApiProperty({ example: 'SPAN', description: 'Ban reason' })
    @IsString({message:"BanReason value must be as string"})
    readonly banReason:string

    @ApiProperty({ example: '1', description: 'User id' })
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}