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
                <button onClick={this.props.closeModal} className="p-3 text-white border rounded">Chat</button>
            </div>
            
        )
    }
}