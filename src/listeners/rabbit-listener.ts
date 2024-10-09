import amqp from 'amqplib/callback_api';
import { processingQueue } from '../queues/bull-queue';

async function addJobToQueue(data: { message: string }) {
  try {
    const job = await processingQueue.add('processMessage', data);
    console.log(`Job ${job.id} added to processing queue with data:`, data);
  } catch (error) {
    console.error('Failed to add job to queue:', error);
  }
}


export function startRabbitListener() {
  amqp.connect('amqp://user:password@localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = 'hello';

      channel.assertQueue(queue, { durable: false });

      console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

      channel.consume(
        queue,
        (msg) => {
          const messageContent: string | undefined = msg?.content?.toString();

          if (typeof messageContent !== 'string') {
            console.error('Received an undefined or non-string message content');
            return;
          }

          try {
            // const parsedMessage = JSON.parse(messageContent);

            addJobToQueue({ message: messageContent }).catch(console.error);
          } catch (error) {
            console.error('Failed to parse message content:', error);
          }

          // addJobToQueue({ message: messageContent });
        },
        { noAck: true }
      );
    });
  });
}