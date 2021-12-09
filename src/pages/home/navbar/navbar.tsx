import React from 'react'

export default class NavbarMenu extends React.Component{
  render(){
    return(
      <nav className="flex flex-wrap justify-between p-3 text-sm font-semibold shadow">
        <img className="p-3 px-10 bg-gray-200" src="" alt="Logo" />
        <div className="flex justify-end">
          <h2 className="self-center mx-5">Nome Sobrenome</h2>
          <img className="p-5 bg-gray-200 rounded-full" src="" alt="Pic" />
        </div>
      </nav>
    )
  }
}