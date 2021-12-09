import React from "react"
import InputCustom from "../../../components/inputs/input-custom"
import SelectCustom from "../../../components/inputs/select-custom"

interface PacienteProps{
  closeModal: any
}

export default class AddPaciente extends React.Component<PacienteProps, any>{
  constructor(props:PacienteProps){
    super(props)
  }
  render(){
    return(
      <form className="flex flex-col gap-1 p-0 text-black bg-gray-200 rounded lg:p-10" action="">
        <h2 className="my-5 font-semibold text-center text-md">Informações do paciente</h2>
        <InputCustom label="nome" type="text" name="nome" placeholder="nome"></InputCustom>
        <InputCustom label="email" type="email" name="email" placeholder="email"></InputCustom>
        <label className="w-full mt-3 mb-1"> <span className="mr-2 text-sm font-semibold">DDI</span> 
        <SelectCustom handleChange options={[{name: "Brasil", option:"+55"}]} />
        </label>
        <InputCustom label="telefone" type="tel" name="numero" placeholder="numero"></InputCustom>
      <div className="flex justify-around gap-2 mt-3">
        <button onClick={this.props.closeModal} className="w-full p-3 bg-gray-100 rounded hover:bg-gray-300">Cancelar</button>
        <button className="w-full p-3 bg-gray-100 rounded hover:bg-gray-300">Confirmar</button>
      </div>
      </form>
    )
  }
}