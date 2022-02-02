import React from "react";
import InputCustom from "../../../components/inputs/input-custom";
import PsicologoService from "../../../services/psicologo.service";
import { toast } from "react-toastify";
import CookiesProvider from "../../../providers/Cookies.provider";
import logo from "../../../assets/images/emdrLogo.png"
import { Link } from "react-router-dom";

interface PsicologoState {
  email: string;
  senha: string;
}

export default class LoginPsicologo extends React.Component<
  any,
  PsicologoState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      senha: "",
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
    try {
      const response: any = await auth_service.login(data_to_send);
      if (response.auth) {
        toast.success("Usuário logado com sucesso!");
        const url = window.location.href;
        const path = url.split("/")[0];
        const cookies_provider = new CookiesProvider();
        cookies_provider.saveUserData(response);
       setInterval(() => {
          window.location.href = `${path}/home`;
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Erro no login, tente mais tarde!");
    }
  }

  render() {
    return (
      <form
        className="grid grid-cols-1 gap-1 p-0 text-black rounded lg:grid-cols-2 lg:p-10"
        onSubmit={(event) => this.submitForm(event)}
        onChange={this.handleChange}
      >
        <h2 className="col-span-2 my-5 text-2xl font-light text-center">
          Entrar no sistema
        </h2>
        <img className="w-40 mx-auto col-span-2 mb-5" src={logo} alt="Logomarca" />

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
          <button className="w-full text-white font-light text-xl p-3 bg-blue-500 rounded hover:bg-blue-600 hover:shadow-xl">
            Entrar
          </button>
        </div>
          <Link to="/recuperar-senha/digitar-email" className="font-light text-right col-span-2" >Recuperar Senha</Link>
      </form>
    );
  }
}
