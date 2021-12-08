import React from 'react'
import NavbarMenu from './navbar/navbar'
import TableMenu from './table/homeTable'

export default class HomePage extends React.Component{
  render(){
    return(
      <div>
        <NavbarMenu></NavbarMenu>
        <TableMenu></TableMenu>
      </div>
    )
  }
}