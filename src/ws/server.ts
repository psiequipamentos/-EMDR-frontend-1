import io, { Socket } from "socket.io-client";
import crypto from "crypto";
import {serverConnectionConfigProduction} from "../config/server-connection.config";


export default class WebsocketServer {
  private ws_url: any;
  public socket: Socket;

  constructor() {
    this.ws_url = serverConnectionConfigProduction.websocket_url;
    this.socket = io(this.ws_url);
  }

  run = (user_type: string, code:string) => {
    this.socket.on("connect", () => console.log(`[IO] `+`${user_type}`+` conectado`));
    const id = crypto.randomBytes(16).toString("hex");
    const data_to_send = {
      session_code: code,
      user: {
        type: user_type,
      },
    };
    this.socket.emit("join-session", data_to_send);
  };
}
