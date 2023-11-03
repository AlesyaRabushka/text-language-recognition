import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"

const PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();


  await app.listen(PORT, () => {
    console.log(`[SERVER STARTED] listen to ${PORT}`)
  });
}
bootstrap();
