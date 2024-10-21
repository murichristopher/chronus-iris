import { startRabbitListener } from "./src/listeners/rabbit-listener";
import { startWorker } from "./src/workers/message-processor";


startRabbitListener();

startWorker()


import { processingQueue } from './src/queues/bull-queue'; // Importa a fila do BullMQ

async function testWorker() {
  try {
    await processingQueue.add('processMessage', { message: 'Test job for worker' });
    console.log('Test job added to processing queue.');
  } catch (error) {
    console.error('Failed to add test job:', error);
  }
}

testWorker();


import Fastify from 'fastify'
import { type FastifyInstance } from "fastify"
import { type RouteShorthandOptions } from 'fastify'
import { getContactsHandler } from "./src/controllers/contact-controller";
import { getContactsOpts } from "./src/routes/contact-opts";
import { getConnectHandler } from "./src/controllers/connect-controller";
import { getConnectOpts } from "./src/routes/connect-opts";

const server: FastifyInstance = Fastify({
  logger: true
})

server.get('/contacts', getContactsOpts, getContactsHandler);
server.get('/instance_connect', getConnectOpts, getConnectHandler);

const start = async () => {
  try {
    await server.listen({ port: 5678 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
