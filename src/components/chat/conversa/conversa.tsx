import React from 'react'
import MensagemRecebida from '../mensagem/MensagemRecebida'
import MensagemEnviada from '../mensagem/mensagemEnviada'

interface ConversaProps{
  conversa: any
}

interface ConversaState{
  conversa: any
}

export default class Conversa extends React.Component<ConversaProps, ConversaState>{
  constructor(props: ConversaState){
    super(props)
  }

  componentDidMount(){
    this.setState({conversa: this.props.conversa})
  }

  render(){
    return(
      < >
        {this.state.conversa.map(
          (mensagem: any) => {
              if (mensagem.nome) {
                  return <MensagemRecebida nome={mensagem.nome} texto={mensagem.texto} horario={mensagem.horario} />
              }
              else{
                  return <MensagemEnviada texto={mensagem.texto} horario={mensagem.horario} />
              }
          }
      )}
      </ >
    )
  }
}