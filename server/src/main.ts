import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
require('dotenv').config();

const PORT = process.env.PORT || 3000;
async function bootstrap() {
    console.log(typeof process.env.DB_PASSWORD)
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())
    await app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
}
bootstrap();
