import type { FastifyReply, FastifyRequest } from "fastify";
import { connectInstance } from "../services/connect-instance";

export const getConnectHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const base64Img = await connectInstance()

  console.log("BASE64", base64Img)

  return {
    code_base64: base64Img,
  }
};
