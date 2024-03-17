import io, { Socket } from "socket.io-client";
import {serverConnectionConfigProduction} from "../config/server-connection.config";


export default class WebsocketServer {
  private ws_url: any;
  public socket: Socket;
  public current_user_type: null | string = null;

  constructor() {
    this.ws_url = serverConnectionConfigProduction.websocket_url;
    this.socket = io(this.ws_url);
  }

  run = (user_type: string, code:string) => {
    this.socket.on("connect", () => console.log(`[IO] ${user_type}  conectado`));
    this.current_user_type = user_type;
    const data_to_send = {
      session_code: code,
      user: {
        type: user_type,
      },
    };
    this.socket.emit("join-session", data_to_send);
  };
}
