import React from "react";

interface IButtonCustomProps{
    closeModal: any
}

export default class buttonCustom extends React.Component<IButtonCustomProps, any>{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <div>
                <button onClick={this.props.closeModal} className="p-5 text-gray-700 bg-gray-200 rounded">Clique aqui</button>
            </div>
            
        )
    }
}