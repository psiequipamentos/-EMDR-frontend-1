import { queryByAttribute } from '@testing-library/dom'
import React from 'react'
import InputCustom from '../inputs/input-custom'
import Contato from './contato/contato'
import { contatos } from './dummy/contatos'
import { conversaDummy } from './dummy/conversa'
import MensagemEnviada from './mensagem/mensagemEnviada'
import MensagemRecebida from './mensagem/MensagemRecebida'

interface IChatState{
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
            myRef: React.createRef() ,
        }

        this.handleChange = this.handleChange.bind(this)
        this.enviarMensagem = this.enviarMensagem.bind(this)
        this.executeScroll = this.executeScroll.bind(this)
    }

    componentDidMount(){
        this.setState({conversa: conversaDummy}, ()=> this.executeScroll())
        const tx = document.getElementsByTagName("textarea");
        const limit = 300
        const minHeight = 50
        for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight));
        tx[i].addEventListener("blur", function OnBlur() {
            this.style.height = minHeight + "px";
        })
        tx[i].addEventListener("input", function OnInput() {
            this.style.height = "auto";
            if(this.scrollHeight <= limit){
                this.style.height = (this.scrollHeight) + "px";
            } else{
                this.style.height = limit + "px";
            }
          }, false);
        }
    }

    
    

    executeScroll = () => this.state.myRef.current.scrollIntoView()

    enviarMensagem(event: any){
        event.preventDefault()
        if(this.state.mensagem){
            const mensagem = {texto: this.state.mensagem, horario: `${new Date().getDate().toString()}/${(new Date().getMonth() + 1).toString()} - ${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`}
            this.setState({conversa: [...this.state.conversa, mensagem]}, ()=>
            this.setState({mensagem: ''})
            )
            this.executeScroll()
        }
    }

    handleChange = (event: any) => this.setState({[event.target.name]: event.target.value} as any)

    render() {
        return (
            <section className="grid grid-cols-12">

                <div className="hidden h-screen px-2 py-10 overflow-y-auto text-blue-700 bg-blue-50 lg:col-span-4 lg:block">
                    {contatos.map(contato => <Contato foto={contato.foto} nome={contato.nome} />)}
                </div>

                <div className="h-screen col-span-12 pb-10 overflow-y-auto bg-gray-100 lg:col-span-8">
                    <section className="fixed top-0 w-full text-center text-white bg-gray-400 lg:p-3 lg:w-4/6">
                        Nome
                    </section>
                    {/* <section className="fixed top-0 w-full mb-10 text-center bg-red-500">
                        <span className="text-xl font-light text-center text-white">Nome</span>
                    </section> */}
                    <div className="p-3 mb-10"></div>

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
                    <div className="pb-10"></div>
                    <div ref={this.state.myRef} className="pb-10"></div>
                    <form onSubmit={this.enviarMensagem} className="fixed bottom-0 grid w-full grid-cols-12 lg:w-4/6">
                        <textarea style={{resize: "none"}} value={this.state.mensagem} onChange={(event)=>this.handleChange(event)} name="mensagem" className="col-span-10 px-2 pt-1 overflow-y-auto break-words border-0 rounded-full outline-none" placeholder="Digite sua mensagem">{this.state.mensagem}</textarea>

                        {/* <input value={this.state.mensagem} autoComplete="off" name="mensagem" onChange={(event)=>this.handleChange(event)} placeholder="Digite sua mensagem" className="h-auto col-span-10 p-2 overflow-y-auto break-words border-2 outline-none" /> */}
                        <button onClick={this.enviarMensagem} className="bottom-0 col-span-2 text-white bg-gray-700 max-h-20">Enviar</button>
                    </form>
                </div>
            </section>

        )
    }
}