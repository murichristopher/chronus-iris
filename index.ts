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


// import Fastify from 'fastify'
// import { type FastifyInstance } from "fastify"
// import { type RouteShorthandOptions } from 'fastify'
// // import { Server, IncomingMessage, ServerResponse } from 'http'

// const server: FastifyInstance = Fastify({
//   logger: true
// })

// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           pong: {
//             type: 'string'
//           }
//         }
//       }
//     }
//   }
// }

// server.get('/ping', opts, async (request, reply) => {
//   return { pong: 'it worked!' }
// })

// server.route({
//   method: 'GET',
//   url: '/',
//   schema: {
//     querystring: {
//       type: 'object',
//       properties: {
//         name: { type: 'string' }
//       },
//       required: ['name'],
//     },
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           hello: { type: 'string' }
//         }
//       }
//     }
//   },
//   preHandler: async (request, reply) => {
//   },
//   handler: async (request, reply) => {
//     const name = request.query.name;

//     // Exibe o request no console (opcional)
//     console.log(request);

//     // Retorna uma resposta personalizada usando o parâmetro 'name'
//     return { hello: `Hello, ${name}!` };
//   }
// });


// const start = async () => {
//   try {
//     await server.listen({ port: 3000 })

//     const address = server.server.address()
//     const port = typeof address === 'string' ? address : address?.port

//   } catch (err) {
//     server.log.error(err)
//     process.exit(1)
//   }
// }

// start()
