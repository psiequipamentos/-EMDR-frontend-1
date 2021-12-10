import React from "react";
import InputCustom from "../../../components/inputs/input-custom";
import PsicologoService from "../../../services/psicologo.service";

interface PsicologoState {
  email: string;
  senha: string;
}

export default class LoginPsicologo extends React.Component<any, PsicologoState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      senha: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = (event: any) =>
    this.setState({ [event.target.name]: event.target.value } as any);

  async submitForm(event: any) {
    event.preventDefault();
    const auth_service = new PsicologoService();
    const data_to_send = {
      email: this.state.email,
      senha: this.state.senha,
    };
    const response = await auth_service.login(data_to_send);
    console.log(response);

  }

  render() {
    return (
      <form
        className="grid grid-cols-1 gap-1 p-0 text-black bg-gray-200 rounded lg:grid-cols-2 lg:p-10"
        onSubmit={(event) => this.submitForm(event)}
        onChange={this.handleChange}
      >
        <h2 className="col-span-2 my-5 text-lg font-semibold text-center">
          Entrar no sistema
        </h2>

        <div className="col-span-2 lg:col-span-1">
          <InputCustom
            label="Email"
            type="email"
            name="email"
            placeholder="email"
          />
        </div>
      
        <div className="col-span-2 lg:col-span-1">
        <InputCustom
          label="Senha"
          type="password"
          name="senha"
          placeholder="Senha"
        ></InputCustom>
        </div>


        <div className="flex justify-around col-span-2 gap-2 mt-3">
          <button className="w-full p-3 bg-gray-100 rounded hover:bg-gray-300">
            Entrar
          </button>
        </div>
      </form>
    );
  }
}
