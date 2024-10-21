import axios, { AxiosError } from "axios";
import type { FastifyReply, FastifyRequest } from "fastify";

interface QueryParams {
  limit?: string;
}

interface Contact {
  name: string;
  number: string;
}

const formatNumber = (jid: any) => {
  const [contactNumber] = jid.split("@")

  return contactNumber;
}

const onlyContactsWithName = (contact: any) => {
  return Boolean(contact.pushName);
};

const formatContact = (contact: any): any => {
  return {
    name: contact.pushName,
    number: formatNumber(contact.remoteJid)
  }
};

export const getContactsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request?.query as QueryParams

  const limit = parseInt(query.limit || "10")

  const { data: contacts } = await axios.post(
    "http://localhost:8080/chat/findChats/MY_App",
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': 'mude-me',
      },
    }
  );


  return contacts.filter(onlyContactsWithName).map(formatContact).reverse().slice(0, limit) as Contact[];
};
