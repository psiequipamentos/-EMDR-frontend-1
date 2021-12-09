import React from "react";
import InputCustom from "../../../components/inputs/input-custom";
import SelectCustom from "../../../components/inputs/select-custom";

interface PsicologoState {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: number;
  ddi: any;
  senha: string;
  confirmarSenha: string;
}

export default class AddPsicologo extends React.Component<any, PsicologoState> {
  constructor(props: any) {
    super(props);

    this.state = {
      nome: "",
      sobrenome: "",
      email: "",
      telefone: 0,
      ddi: "",
      senha: "",
      confirmarSenha: "",

    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = (event: any) =>
    this.setState({ [event.target.name]: event.target.value } as any);

  submitForm(event: any) {
    event.preventDefault();
    console.log(this.state);
    
  }

  render() {
    return (
      <form
        className="grid grid-cols-2 gap-1 p-0 text-black bg-gray-200 rounded lg:p-10"
        onSubmit={(event) => this.submitForm(event)}
        onChange={this.handleChange}
      >
        <h2 className="col-span-2 my-5 text-lg font-semibold text-center">
          Cadastro de psicólogo
        </h2>

        <InputCustom label="Nome" type="text" name="nome" placeholder="Nome" />
        <InputCustom
          label="Sobrenome"
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
        />

        <div className="col-span-2">
          <InputCustom
            label="Email"
            type="email"
            name="email"
            placeholder="email"
          />
        </div>

        <label className="mt-3 mb-1">
          <span className="mr-2 text-sm font-semibold">DDI</span>
          <SelectCustom
            handleChange
            options={[{ name: "Brasil", option: "+55" }]}
          />
        </label>

        <InputCustom
          label="Telefone"
          type="tel"
          name="telefone"
          placeholder="numero de telefone"
        ></InputCustom>

        <InputCustom
          label="Senha"
          type="password"
          name="senha"
          placeholder="Senha"
        ></InputCustom>

        <InputCustom
          label="Confirmar senha"
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar senha"
        ></InputCustom>

        <div className="flex justify-around col-span-2 gap-2 mt-3">
          <button className="w-full p-3 bg-gray-100 rounded hover:bg-gray-300">
            Confirmar
          </button>
        </div>
      </form>
    );
  }
}
