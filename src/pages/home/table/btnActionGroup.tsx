import React from "react"
import EditProfileBtn from "../../../components/buttons/EditProfileBtn"
import InviteBtn from "../../../components/buttons/sendInviteBtn"
import Modal from "../../../components/modals/modal"
import Invite from "../invite"

interface BtnProps{
  paciente: any
}

export default class BtnActionGroup extends React.Component<BtnProps, any>{
  constructor(props:BtnProps){
    super(props)
  }

  render(){
    return(
      <div className="flex flex-wrap col-span-1 gap-1">
                <button className="px-1 text-sm font-semibold text-right border rounded">Iniciar sessão</button>
                <Modal openModalComponent={InviteBtn}>
                  <Invite
                    nome={this.props.paciente.nome} 
                    email={this.props.paciente.email} 
                    whatsapp={this.props.paciente.whatsapp} 
                    telegram={this.props.paciente.telegram}
                  />
                </Modal>
                <Modal openModalComponent={EditProfileBtn}>
                  Formulário de edição do paciente {this.props.paciente.id}
                </Modal>
              </div>
    )
  }
}