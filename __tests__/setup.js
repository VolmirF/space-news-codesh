import mongoose from '../src/database';

afterAll(async () => {
  // Cleanup logic
  await mongoose.connection.close(true);
});
