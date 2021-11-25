import React from "react";
import { conversaDummy } from "./dummy/conversa";
import MensagemRecebida from "./mensagem/MensagemRecebida";
import MensagemEnviada from "./mensagem/mensagemEnviada";
import Cookies from "universal-cookie";
interface IChatState {
  conversa: any;
  mensagem: any;
  myRef: any;
}
interface ChatProps {
  socket: any;
  trigger: any;
}

export default class Chat extends React.Component<ChatProps, IChatState> {
  constructor(props: ChatProps) {
    super(props);

    this.state = {
      conversa: [],
      mensagem: "",
      myRef: React.createRef(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.enviarMensagem = this.enviarMensagem.bind(this);
    this.executeScroll = this.executeScroll.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    this.setState({ conversa: conversaDummy }, () => this.executeScroll());
     this.props.socket.emit('update-messages')
     this.props.socket.on("update-messages", (data: any) =>{
      data.forEach(({ message }: any) => {
        this.setState({ conversa: [...this.state.conversa, message] }, () => {
          this.setState({ mensagem: "" });
        });
      })}
    );
    this.props.socket.on("new-message", ({ message }: any) => {
      this.newMessage(message);
    });
  }

  executeScroll = () => this.state.myRef.current.scrollIntoView();

  newMessage = (message: any = false) => {
    let mensagem: any;
    if (message) {
      mensagem = {
        nome: message.nome,
        texto: message.texto,
        horario: message.horario,
      };
    } else {
      mensagem = {
        texto: this.state.mensagem,
        horario: `${new Date().getHours().toString()}:${new Date()
          .getMinutes()
          .toString()}`,
      };
    }

    this.setState({ conversa: [...this.state.conversa, mensagem] }, () => {
      if (!message)
        this.props.socket.emit("new-message", { message: mensagem });
      this.setState({ mensagem: "" });
    });
    //this.executeScroll();
  };
  enviarMensagem(event: any) {
    event.preventDefault();
    if (this.state.mensagem) {
      this.newMessage();
    }
  }

  handleChange = (event: any) =>
    this.setState({ [event.target.name]: event.target.value } as any);

  render() {
    return (
      <section className="">
        <div className="pb-10 overflow-y-auto text-gray-700 bg-gray-100 h-96">
          {this.state.conversa.map((mensagem: any) => {
            if (mensagem.nome) {
              return (
                <MensagemRecebida
                  nome={mensagem.nome}
                  texto={mensagem.texto}
                  horario={mensagem.horario}
                />
              );
            } else {
              return (
                <MensagemEnviada
                  texto={mensagem.texto}
                  horario={mensagem.horario}
                />
              );
            }
          })}

          <div ref={this.state.myRef} className="py-10"></div>

          <form
            onSubmit={this.enviarMensagem}
            className="absolute bottom-0 flex w-full overflow-y-auto bg-gray-100"
          >
            <input
              value={this.state.mensagem}
              autoComplete="off"
              name="mensagem"
              onChange={(event) => this.handleChange(event)}
              placeholder="Digite sua mensagem"
              className="w-full h-auto p-2 overflow-y-auto break-words border-2 outline-none"
            />
            <button
              onClick={this.enviarMensagem}
              className="bottom-0 px-10 text-white bg-gray-700 max-h-20"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    );
  }
}
