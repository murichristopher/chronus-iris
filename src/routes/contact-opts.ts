import { type RouteShorthandOptions } from 'fastify';

export const getContactsOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            number: { type: 'string' }
          }
        }
      }
    }
  }
};
