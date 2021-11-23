import React from 'react'
import MensagemRecebida from '../mensagem/MensagemRecebida'
import MensagemEnviada from '../mensagem/mensagemEnviada'
import { conversaDummy } from '../dummy/conversa'

interface ConversaProps{
  chat: any
}

interface ConversaState{
  chat: any
}

export default class Conversa extends React.Component<ConversaProps, ConversaState>{
  constructor(props: ConversaProps){
    super(props)
    this.state = {
      chat: this.props.chat
    }
  }

  componentDidMount(){
    this.setState({chat: [...this.props.chat]})
  }

  render(){
    return(
      <div>
        {this.state.chat.map(
          (mensagem: any) => {
              if (mensagem.nome) {
                  return <MensagemRecebida nome={mensagem.nome} texto={mensagem.texto} horario={mensagem.horario} />
              }
              else{
                  return <MensagemEnviada texto={mensagem.texto} horario={mensagem.horario} />
              }
          }
      )}
      </div>
    )
  }
}