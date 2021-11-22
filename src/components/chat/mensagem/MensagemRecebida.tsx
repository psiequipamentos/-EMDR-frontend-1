import React from 'react'

interface IMyMessageProps {
    nome: any
    texto: any
    horario: any
}

export default class MyMessage extends React.Component<IMyMessageProps, any>{
    constructor(props: IMyMessageProps) {
        super(props)
    }

    render() {
        return (
            <article className="flex flex-row flex-wrap py-1 m-2 lg:border-b lg:px-5">
                <div className="max-w-xs px-2 py-1 pr-10 bg-gray-300 rounded shadow lg:max-w-2xl">
                <span className="font-semibold">{this.props.nome}</span> <br />

                    <span className="pr-10 text-sm break-all">{this.props.texto}</span><br />
                <span className="mb-1 text-xs font-semibold text-center text-gray-600 lg:mr-10">{this.props.horario}</span>
                </div>
            </article>
        )
    }
}