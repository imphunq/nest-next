import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseData } from 'src/common/globalClass';
import { HttpMessage, HttpStatus } from 'src/common/globalEnum';
import { UserDTO } from 'src/dto/users.dto';
import { User } from './users.enity';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUsers(): Promise<ResponseData<User[] | string>> {
        try {
            const users = await this.userService.getUsers()

            return new ResponseData<User[]>(
                users, 
                HttpStatus.SUCCESS, 
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData<string>(
                null, 
                HttpStatus.ERROR, 
                HttpMessage.ERROR
            );
        }
    }

    @Post()
    async createUser(@Body(new ValidationPipe()) userDto: UserDTO): Promise<ResponseData<User | string>> {
        try {
            const user = await this.userService.createUser(userDto);

            return new ResponseData<User>(
                user, 
                HttpStatus.SUCCESS, 
                HttpMessage.SUCCESS
            );
        } catch {
            return new ResponseData<string>(
                null, 
                HttpStatus.ERROR, 
                HttpMessage.ERROR
            );
        }
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<User | string>> {
        try {
            const user = await this.userService.getUser(id)

            return new ResponseData<User>(
                user, 
                HttpStatus.SUCCESS, 
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData<string>(
                null, 
                HttpStatus.ERROR, 
                HttpMessage.ERROR
            );
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<DeleteResult | string>> {
        try {
            const result = await this.userService.deleteUser(id)

            return new ResponseData<DeleteResult>(
                result, 
                HttpStatus.SUCCESS, 
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData<string>(
                null, 
                HttpStatus.ERROR, 
                HttpMessage.ERROR
            );
        }
    }
}
