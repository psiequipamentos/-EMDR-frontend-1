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
                <button onClick={this.props.closeModal} className="z-30 p-5 mx-1 border rounded lg:p-3 text-black lg:text-white hover:bg-white hover:text-black text-xs font-semibold"><svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} className="m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg></button>
            </div>
            
        )
    }
}