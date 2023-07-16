import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Yesssss!!!! database connected successfully`);

    app.listen(config.port, () => {
      console.log(`The Application is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`OMG!!!! Failed to connect database`, error);
  }
}

bootstrap();
