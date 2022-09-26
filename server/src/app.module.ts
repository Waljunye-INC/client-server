import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [
      ConfigModule.forRoot({
         envFilePath: '.env'
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          autoLoadModels: true,
          synchronize: true,
      }),
      UserModule,
      AuthModule,
      RolesModule,
      PostsModule
  ],
  controllers: [AppController]
})
export class AppModule {}
