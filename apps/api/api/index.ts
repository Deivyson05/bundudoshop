import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import serverlessHttp from 'serverless-http';
import { AppModule } from '../src/app.module';

// A Vercel executa cada requisicao numa function serverless: em vez de dar
// "listen" numa porta (como no main.ts local), embrulhamos o app Express
// do Nest com serverless-http e reaproveitamos a instancia entre chamadas
// (cache no escopo do modulo) para reduzir cold starts.
let cachedHandler: ReturnType<typeof serverlessHttp>;

async function bootstrapServer() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.init();
  return serverlessHttp(expressApp);
}

export default async function handler(req: any, res: any) {
  if (!cachedHandler) {
    cachedHandler = await bootstrapServer();
  }
  return cachedHandler(req, res);
}
