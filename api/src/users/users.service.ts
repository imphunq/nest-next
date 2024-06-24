import { Injectable } from '@nestjs/common';
import { User } from './users.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from 'src/dto/users.dto';
import * as bcrypt from 'bcrypt'
import { DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async createUser(userDto: UserDTO): Promise<User> {
        const password = await bcrypt.hash(userDto.password, 10)

        return this.usersRepository.save({
            ...userDto,
            password,
        });
    }

    getUser(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                id,
            },
        });
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }
}
