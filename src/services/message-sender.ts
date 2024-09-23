import axios, { AxiosError } from "axios";

interface MessageParams {
  message: string;
  number: string;
}

export async function sendTextMessage({ message, number }: MessageParams) {
  await axios.post("http://localhost:8080/message/sendText/MY_APP", {
    number: number,
    text: message,
  }, {
    headers: {
      apikey: "mude-me"
    }
  }).catch((err) => {
    if (err instanceof AxiosError) {
      console.log("Failed to send message", err.toJSON());
    }
  });
}

// await sendTextMessage({
//   message: "OII jujninho pernambucano kkk!!"
// })