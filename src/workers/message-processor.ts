// src/workers/messageProcessor.ts
import { Worker } from 'bullmq';
import { sendTextMessage } from '../services/message-sender';

export const startWorker = () => {
  console.log('Initializing worker...');

  const worker = new Worker(
    'processingQueue',
    async (job) => {
      console.log(`Processing job with ID: ${job.id}`);
      console.log(`Job data:`, job.data);
      const parsedMessage = JSON.parse(job.data.message)
      console.log("PARSED MESSAGE IS:", parsedMessage)
      await sendTextMessage({ message: parsedMessage.text, number: parsedMessage.to })

      return `Processed message: ${parsedMessage}`;
    },
    {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully.`);
  });

  worker.on('failed', (job: any, err) => {
    console.log(`Job ${job.id} failed with error: ${err.message}`);
  });

  worker.on('error', (error) => {
    console.error('Worker encountered an error:', error);
  });

  console.log('Worker started and ready to process jobs.');
};
