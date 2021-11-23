import React from 'react'

interface IMensagemEnviadaProps{
    texto: any
    horario: any
}

export default class MensagemEnviada extends React.Component<IMensagemEnviadaProps, any>{
    constructor(props: IMensagemEnviadaProps) {
        super(props)
    }

    render() {
        return (
            <article className="flex flex-row-reverse flex-wrap py-1 m-2 ml-10 lg:border-b lg:px-5">
                <div className="max-w-xs px-5 py-1 bg-gray-200 rounded shadow lg:max-w-2xl">
                    {/* <div className="px-2 py-1 font-semibold text-left">{this.props.nome}</div> */}
                    <div className="px-2 text-sm text-left break-words">{this.props.texto}</div>
                    <div className="px-2 py-1 text-xs font-semibold text-right text-gray-600 ">{this.props.horario}</div>
                </div>
            </article>
        )
    }
}