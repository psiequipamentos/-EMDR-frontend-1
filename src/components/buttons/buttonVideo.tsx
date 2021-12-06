import React from "react";
import {hide} from "../../pages/emdr/icons";

interface IButtonCustomProps{
    closeModal: any
}

export default class ButtonVideo extends React.Component<IButtonCustomProps, any>{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <div>
                <button onClick={this.props.closeModal} className="p-3 text-white border rounded">{hide}</button>
            </div>

        )
    }
}
