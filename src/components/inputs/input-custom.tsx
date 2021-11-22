import React from "react";
import { handleInputStyle, inputStyle, labelStyle } from "./inputStyle";

interface IInputProps {
    placeholder: string
    type: string
    name: string
    value?: any
    label?: any
}

interface IInputState{
    value: any
    dinamicType: any
}

export default class InputCustom extends React.Component<IInputProps, any>{
    constructor(props: IInputProps) {
        super(props)
        this.state = {
            value: '',
            dinamicType: 'password'
        }
        this.changeValue = this.changeValue.bind(this)
        this.changeType = this.changeType.bind(this)
    }

    componentDidMount(){
        this.props.value? this.setState({value: this.props.value}): this.setState({value: ''})
    }

    changeValue = (event: any) => this.setState({value: event.target.value})
    changeType(){
        if(this.state.dinamicType === 'password'){
            this.setState({dinamicType: 'text'})
        } else{this.setState({dinamicType: 'password'})}
    } 

    render() {
        return (
                <label className={labelStyle}> {this.props.label}
            <div className={ inputStyle + " flex"}>
                    <input 
                required
                autoComplete={this.props.name=="cpf"? "off" : "on"}
                className={handleInputStyle}
                placeholder={this.props.label? '' : this.props.placeholder} 
                name={this.props.name}
                type={this.props.type==='password'? this.state.dinamicType : this.props.type }
                value={this.state.value}
                onChange={this.changeValue}
                />
                 {this.props.type==='password'?
                <button onClick={this.changeType}> olhinho </button>: null
            } 
            </div>
            </label>
        )
    }
}