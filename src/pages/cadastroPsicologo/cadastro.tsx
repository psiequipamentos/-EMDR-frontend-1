import React from "react"
import AddPsicologo from "../home/forms/addPsicologo"

export default class Cadastro extends React.Component{
  render(){
    return(
      <div className="grid items-center grid-cols-12 bg-gray-200 lg:p-10">
        <div className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3">
          <AddPsicologo />
        </div>
      </div>
    )
  }
}