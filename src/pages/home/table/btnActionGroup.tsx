import React from "react"
import EditProfileBtn from "../../../components/buttons/EditProfileBtn"
import InviteBtn from "../../../components/buttons/sendInviteBtn"
import Modal from "../../../components/modals/modal"
import EditPaciente from "../forms/editPaciente"
import Invite from "../invite"
import axios from "axios";
import DailyService from "../../../services/daily.service";
import { play } from "../../emdr/icons"
import TwilioService from "../../../services/twilio.service";
import CookiesProvider from "../../../providers/Cookies.provider"

interface BtnProps{
  paciente: any
}

interface BtnState {
    text: string;
    enabled:boolean;
}

export default class BtnActionGroup extends React.Component<BtnProps, BtnState>{

  constructor(props:BtnProps){
    super(props)

      this.createCall = this.createCall.bind(this);
    this.state  = {
        text: 'Criar Sessão',
        enabled: true
      }
  }
    async createCall() {
      const cookies: any = new CookiesProvider()
      const psicolog_id: any = cookies.getUserData().user.id
        this.setState({ text: "Criando ..." , enabled: false});
        const daily_service = new DailyService();
        const daily_create_response: any = await daily_service.create({psicologo: psicolog_id, paciente: this.props.paciente.id})
        console.log(daily_create_response)
        if(daily_create_response.created)
            window.location.reload()
        else
            alert(daily_create_response.error)
    }

  render(){
    return(
      <div className="flex flex-wrap col-span-1 gap-1">
                <button className="px-1 text-xs font-light hover:bg-blue-50 text-right rounded" onClick={() => this.state.enabled ? this.createCall() : null}>{this.props.paciente?.pacient_sessions[0]?.session_code && this.state.text !== "Criando ..." ? "nova sessão" : this.state.text}</button>
                {this.props.paciente?.pacient_sessions[0]?.session_code ? <button className="px-1 text-xs font-light text-right w-12 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={() => window.location.href = "/emdr/psicologo/" + this.props.paciente?.pacient_sessions[0]?.session_code}>{play}</button> : null }
          {this.props.paciente?.pacient_sessions[0]?.session_code ? <Modal openModalComponent={InviteBtn}>
                  <Invite
                      url_sessao={this.props.paciente?.pacient_sessions[0]?.session_code}
                    nome={this.props.paciente.nome}
                    email={this.props.paciente.email}
                    whatsapp={this.props.paciente.telefone}
                    telegram={this.props.paciente.telegram}
                  />
                </Modal> : null }
                <Modal openModalComponent={EditProfileBtn}>
                  <EditPaciente paciente={this.props.paciente} />
                </Modal>
              </div>
    )
  }
}
