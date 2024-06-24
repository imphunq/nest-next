import { DataSource } from "typeorm";
import { User } from '../users/users.enity';
import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';
import { CreatePostsTable1718881560592 } from './migrations/1718881560592-CreatePostsTable';

config()

const configService = new ConfigService()

const AppDataSource = new DataSource({
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [User],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    }).catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

export default AppDataSource