import React from "react";

interface IEditar{
    style?: string
}

export default class Editar extends React.Component<IEditar, any>{
    constructor(props: IEditar) {
        super(props)
    }
    render(){
        return(
            <div className={" \" " + "pl-2 mx-3 md:mr-40" + this.props.style + " "  + " \" "}>
                <button>
                    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 5.33328H4.99996C4.1159 5.33328 3.26806 5.68447 2.64294 6.30959C2.01782 6.93471 1.66663 7.78256 1.66663 8.66661V26.9999C1.66663 27.884 2.01782 28.7318 2.64294 29.357C3.26806 29.9821 4.1159 30.3333 4.99996 30.3333H23.3333C24.2173 30.3333 25.0652 29.9821 25.6903 29.357C26.3154 28.7318 26.6666 27.884 26.6666 26.9999V18.6666L13.3333 5.33328ZM24.31 2.97661C24.6174 2.65824 24.9853 2.4043 25.3919 2.22961C25.7986 2.05491 26.236 1.96296 26.6786 1.95911C27.1212 1.95526 27.5601 2.0396 27.9698 2.20721C28.3795 2.37481 28.7516 2.62232 29.0646 2.93529C29.3776 3.24827 29.6251 3.62044 29.7927 4.0301C29.9603 4.43975 30.0446 4.87868 30.0408 5.32128C30.0369 5.76388 29.945 6.20128 29.7703 6.60796C29.5956 7.01464 29.3417 7.38246 29.0233 7.68995L14.7133 21.9999H9.99996V17.2866L24.31 2.97661Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        )
    }
}