import React from 'react'
import { conversaDummy } from './dummy/conversa'
import MensagemRecebida from './mensagem/MensagemRecebida'
import MensagemEnviada from './mensagem/mensagemEnviada'

interface IChatState {
    conversa: any
    mensagem: any
    myRef: any
}

export default class Chat extends React.Component<any, IChatState>{
    constructor(props: any) {
        super(props)

        this.state = {
            conversa: [],
            mensagem: '',
            myRef: React.createRef(),
        }

        this.handleChange = this.handleChange.bind(this)
        this.enviarMensagem = this.enviarMensagem.bind(this)
        this.executeScroll = this.executeScroll.bind(this)
    }

    componentDidMount() {
        this.setState({ conversa: conversaDummy }, () => this.executeScroll())
    }

    executeScroll = () => this.state.myRef.current.scrollIntoView()

    enviarMensagem(event: any) {
        event.preventDefault()
        if (this.state.mensagem) {
            const mensagem = { texto: this.state.mensagem, horario: `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}` }
            this.setState({ conversa: [...this.state.conversa, mensagem] }, () =>
                this.setState({ mensagem: '' })
            )
            this.executeScroll()
        }
    }

    handleChange = (event: any) => this.setState({ [event.target.name]: event.target.value } as any)

    render() {
        return (
            <section className="">
                <div className="h-screen pb-10 overflow-y-auto bg-gray-100">


                    {this.state.conversa.map(
                        (mensagem: any) => {
                            if (mensagem.nome) {
                                return <MensagemRecebida nome={mensagem.nome} texto={mensagem.texto} horario={mensagem.horario} />
                            }
                            else {
                                return <MensagemEnviada texto={mensagem.texto} horario={mensagem.horario} />
                            }
                        }
                    )}

                    <div ref={this.state.myRef} className="py-10"></div>

                    <form onSubmit={this.enviarMensagem} className="absolute bottom-0 flex w-full overflow-y-auto bg-gray-100">
                        <input value={this.state.mensagem} autoComplete="off" name="mensagem" onChange={(event) => this.handleChange(event)} placeholder="Digite sua mensagem" className="w-full h-auto p-2 overflow-y-auto break-words border-2 outline-none" />
                        <button onClick={this.enviarMensagem} className="bottom-0 px-10 text-white bg-gray-700 max-h-20">Enviar</button>
                    </form>
                </div>
            </section>

        )
    }
}