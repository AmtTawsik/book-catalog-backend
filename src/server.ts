import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

process.on('uncaughtException', error => {
  // error logger
  console.log(error);
  process.exit(1);
});

let server: Server;

// database connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Book Eater Database is connected successfully 😩');

    app.listen(config.port, () => {
      console.log(`Book Eater Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect database 😭😭😭', error);
  }

  // can you find a way to let me down(server) slowly,
  process.on('unhandledRejection', error => {
    if (server) {
      // close and logging error
      server.close(() => {
        // error logger
        console.log(error);
        process.exit(1);
      });
    } else {
      // If server is unavailable, the process will exit
      process.exit(1);
    }
  });
}

bootstrap();

/** SIGTERM
 This maal is used to request termination of a process
 */
process.on('SIGTERM', () => {
  // logger.info('SIGTERM is received');
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
