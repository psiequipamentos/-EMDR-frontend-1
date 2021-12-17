import React from "react";
import { sendIcon } from "../home/mocks/icons";

export default class InviteButton extends React.Component{
    render(){
        return(
            <button className="z-30 p-5 mx-1 border rounded lg:p-1 text-black lg:text-white hover:bg-white hover:text-black text-xs font-semibold" >
                Enviar Link{sendIcon}
                </button>
        )
    }
}