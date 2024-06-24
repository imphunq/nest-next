import { MinLength, IsEmail, IsNotEmpty } from 'class-validator'

export class UserDTO {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @MinLength(3, { message: 'Name must be than 3 characters' })
    name: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email' })
    email: string

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be than 6 characters' })
    password: string
}