import React from 'react'
import Modal from '../../components/modals/modal'
import AddPaciente from './forms/addPaciente'
import BtnAddPaciente from './forms/btnAddPaciente'
import NavbarMenu from './navbar/navbar'
import TableMenu from './table/homeTable'

export default class HomePage extends React.Component{
  render(){
    return(
      <div>
        <NavbarMenu></NavbarMenu>
        <div className="flex justify-end mt-10 mr-5">
          <Modal content={AddPaciente} openModalComponent={BtnAddPaciente} />
        </div>
        <TableMenu></TableMenu>
      </div>
    )
  }
}