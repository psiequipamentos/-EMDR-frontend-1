import React from 'react'
import EditProfileBtn from '../../../components/buttons/EditProfileBtn'
import InviteBtn from '../../../components/buttons/sendInviteBtn'
import Modal from '../../../components/modals/modal'
import Invite from '../invite'
import { pacientes } from '../mocks/pacientes'
import BtnActionGroup from './btnActionGroup'

interface tableState { pacientes: any }

export default class TableMenu extends React.Component<any, tableState>{
  constructor(props: any) {
    super(props)
    this.state = { pacientes: [] }
  }

  componentDidMount() {
    const mockPacientes = pacientes
    this.setState({ pacientes: mockPacientes })
  }

  render() {
    return (
      <section className="font-semibold md:p-10">
        <article className="grid grid-cols-1 py-3 pl-5 mx-0 text-white bg-gray-900 rounded-t md:mx-10 md:grid-cols-2 lg:grid-cols-4"> {/* paciente */}
          <h3 className="col-span-1">Nome</h3>
          <h3 className="col-span-1">E-mail</h3>
          <h3 className="col-span-1">Telefone</h3>
          <div className="col-span-1">Ações</div>
        </article>

        {this.state.pacientes.map(
          (paciente: any, index: any) =>
            <article key={"paciente-" + index} className="grid items-center grid-cols-1 py-3 pl-5 mx-0 border-b md:mx-10 md:grid-cols-2 lg:grid-cols-4"> {/* paciente */}
              <h3 className="col-span-1"> {paciente.nome} </h3>
              <h3 className="col-span-1">{paciente.email}</h3>
              <h3 className="col-span-1">{paciente.whatsapp}</h3>
              <BtnActionGroup paciente={paciente}></BtnActionGroup>
            </article>
        )}


      </section>
    )
  }
}