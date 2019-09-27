import 'reflect-metadata';
import fs from 'fs';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createConnection } from 'typeorm';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import connectRedis from 'connect-redis';

import { createSchema } from './utils/createSchema';
import { redis } from './redis';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  console.log(error);
  process.exit(1);
});

dotenv.config();

const startServer = async () => {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: '' },
    development: { ssl: false, port: 4000, hostname: 'localhost' },
  };

  let environment = 'development';
  const sslPath = `./ssl/${process.env.NODE_ENV}`;

  if (process.env.NODE_ENV === 'production') {
    if (
      fs.existsSync(`${sslPath}/server.key`) &&
      fs.existsSync(`${sslPath}/server.crt`)
    ) {
      environment = process.env.NODE_ENV;
    } else {
      environment = 'development';
    }
  }

  const config = configurations[environment];

  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: `http://${process.env.FRONTEND_HOST || 'localhost'}:3000`,
    }),
  );

  app.use(compression());

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    } as any),
  );

  apolloServer.applyMiddleware({ app });

  // Create the HTTPS or HTTP server, per configuration
  let server;

  if (config.ssl) {
    // Assumes certificates are in .ssl folder from package root.
    // Make sure the files are secured.
    server = https.createServer(
      {
        key: fs.readFileSync(`${sslPath}/server.key`),
        cert: fs.readFileSync(`${sslPath}/server.crt`),
      },
      app,
    );
  } else {
    server = http.createServer(app);
  }

  // Add subscription support
  apolloServer.installSubscriptionHandlers(server);

  server.listen({ port: config.port }, () =>
    console.log(
      '🚀 Server ready at',
      `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
        apolloServer.graphqlPath
      }`,
    ),
  );
};

startServer();
