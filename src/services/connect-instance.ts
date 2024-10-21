import axios from "axios";

const BASE_URL = "http://localhost:8080/";
const DEFAULT_INSTANCE_NAME = "MY_App";
const defaultHeaders = {
  'Content-Type': 'application/json',
  'apiKey': 'mude-me',
}
const routes = {
  logout: BASE_URL + `instance/logout/${DEFAULT_INSTANCE_NAME}`,
  delete: BASE_URL + `instance/delete/${DEFAULT_INSTANCE_NAME}`,
  create: BASE_URL + `instance/create`,
  connect: BASE_URL + `instance/connect/${DEFAULT_INSTANCE_NAME}`,
}

export const logoutInstance = async () => {
  try {
    const headers = defaultHeaders;

    await axios.delete(routes.logout, { headers });

  } catch (e) {
    undefined;
  }
}

export const deleteInstance = async () => {
  try {
    const headers = defaultHeaders;

    await axios.delete(routes.delete, { headers });

  } catch (e) {
    undefined;
  }
}

export const createInstance = async () => {
  const headers = defaultHeaders;

  await axios.post(routes.create,
    {
      "qrcode": true,
      "instanceName": DEFAULT_INSTANCE_NAME,
    },
    { headers }
  );
}

export const generateQrCodeInstance = async (): Promise<string> => {
  const headers = defaultHeaders;

  const { data } = await axios.get(routes.connect,
    { headers }
  );

  return data.base64;
}

export const connectInstance = async () => {
  await logoutInstance()

  await deleteInstance()

  await createInstance()

  const qrCode = await generateQrCodeInstance()

  console.log("qr", qrCode)

  return qrCode;
}



