import React from "react";
import { InviteProps, InviteState } from "./homeInterfaces";
import { copyIcon, emailIcon, telegramIcon, whatsappIcon } from "./mocks/icons";

export default class Invite extends React.Component<InviteProps, InviteState> {
  constructor(props: InviteProps) {
    super(props);
    this.state = {
      linkSessao: `https://${window.location.host}/emdr/paciente/${this.props.url_sessao}`,
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    const copyTextarea: any = document.querySelector(".js-copytextarea");
    copyTextarea.focus();
    copyTextarea.select();
    try {
      var successful = document.execCommand("copy", false, "texto");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
    } catch (err) {
      console.log("Oops, unable to copy");
    }
  }

  render() {
    return (
      <div className="p-5 px-5 bg-gray-200">
        <h1 className="text-center">Convidar paciente</h1>
        <span className="justify-start text-sm text-gray-600">
          Link da sessão
        </span>{" "}
        <br />
        <textarea
          value={this.state.linkSessao}
          className="w-full px-3 py-3 my-3 text-gray-700 bg-gray-200 border border-gray-400 rounded js-copytextarea"
        >
          {this.state.linkSessao}
        </textarea>
        <div className="flex justify-around gap-4">
        {this.props.whatsapp ? (
          <a
            className="text-sm"
            href={`mailto:${this.props.email}?&subject=Link para a sessão EMDR Remoto&body=Olá ${this.props.nome}, Seu link de acesso para a sessão com o psicólogo é ${this.state.linkSessao}`}
          >
            {" "}
            Email
            {emailIcon}
          </a>) : null}
          <button
            onClick={this.copyToClipboard}
            className="text-sm font-semibold js-textareacopybtn"
          >
            {" "}
            Copiar
            {copyIcon}
          </button>
          {this.props.whatsapp ? (
          <a
            className="text-sm"
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/${this.props.whatsapp}?text=Olá ${this.props.nome}, Seu link de acesso para a sessão com o psicólogo é ${this.state.linkSessao}`}
          >
            {" "}
            Whatsapp
            {whatsappIcon}
          </a>) : null}
          {this.props.telegram ? (
            <a
              target="_blank"
              rel="noreferrer"
              className="text-sm"
              href={`https://telegram.me/${this.props.telegram}`}
            >
              {" "}
              Telegram
              {telegramIcon}
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}
