import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Content-Type", "Authorization",'upload-id'],
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle("Your API Title")
    .setDescription("Your API description")
    .setVersion("1.0")
    .addServer("http://localhost:3100/", "Local environment")
    .addTag("Your API Tag")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document, {
    jsonDocumentUrl: "api-docs-json",
  });

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
