import { Queue } from 'bullmq';

export const processingQueue = new Queue('processingQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
}); 