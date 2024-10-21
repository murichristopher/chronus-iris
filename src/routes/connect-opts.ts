import { type RouteShorthandOptions } from 'fastify';

export const getConnectOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          code_base64: { type: 'string' },
        }
      }
    }
  }
};
