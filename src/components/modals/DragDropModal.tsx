import React from "react";
import './dragdropModal.css'
import './drag'

interface IModalProps {
    openModalComponent: any
    content?: any
}

interface IModalState {
    trigger: boolean
    draggableDiv: any
}

export default class DragDropModal extends React.Component<IModalProps, IModalState>{
    constructor(props: IModalProps) {
        super(props)
        this.state = {
            trigger: false,
            draggableDiv: React.createRef()
        }
        this.changeTrigger = this.changeTrigger.bind(this)
        this.dragElement = this.dragElement.bind(this)
    }

    changeTrigger = () => this.setState({ trigger: !this.state.trigger })

    componentDidUpdate(){
        this.dragElement(this.state.draggableDiv.current)
    }


dragElement(elmnt: any) {
    console.log('entrou na função dragElement')
    console.log(elmnt)
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if(elmnt){

    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

    render() {

        return (
            <div>
                <button onClick={this.changeTrigger}>
                    <this.props.openModalComponent />
                </button>
                {this.state.trigger == true ?
                    <section>
                        <div id="mydiv" ref={this.state.draggableDiv} >
                            <div className="relative w-full mx-auto my-6">
                                <div className="relative flex flex-col w-full border-0 rounded-lg outline-none focus:outline-none">
                                    <article className="relative flex-auto w-full mx-auto overflow-auto bg-gray-100 rounded md:w-1/2">
                                    <div className="p-5 bg-red-500" id="mydivheader">Clique aqui para mover o chat</div>
                                        {this.props.content ?
                                            <this.props.content closeModal={this.changeTrigger} />
                                            : this.props.children
                                        }
                                    </article>

                                    {this.props.content ?
                                        <div className="flex justify-center mx-auto mt-5 mb-4 rounded-b md:w-1/2">
                                            <button
                                                onClick={this.changeTrigger}
                                                className="z-40 flex items-center justify-center w-12 h-12 text-white transition transform rotate-45 bg-red-500 border border-red-500 rounded hover:border-white hover:-rotate-45 hover:bg-white hover:text-red-500"
                                            > + </button>
                                        </div> : null
                                    }

                                </div>
                            </div>
                        </div>


                        {/* <div role="button" onClick={this.changeTrigger} className="fixed inset-0 z-40 bg-black bg-opacity-70"></div> */}


                    </section>
                    : null}

            </div>

        );

        

    }
}