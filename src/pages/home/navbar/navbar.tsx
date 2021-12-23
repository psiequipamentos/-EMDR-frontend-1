import React from "react";
import CookiesProvider from "../../../providers/Cookies.provider";

export default class NavbarMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      psicologo: "",
    };
  }
  async componentDidMount() {
    const psicologo_cookie = new CookiesProvider();
    const psicologo = await psicologo_cookie.getUserData();
    this.setState({ psicologo: psicologo.user.nome });
  }
  render() {
    return (
      <nav className="flex flex-wrap justify-between p-3 text-sm font-semibold shadow">
        <img className="p-3 px-10 bg-gray-200" src="" alt="Logo" />
        <div className="flex justify-end">
          <h2 className="self-center mx-5">{this.state.psicologo}</h2>
          <img className="p-5 bg-gray-200 rounded-full" src="" alt="Pic" />
        </div>
      </nav>
    );
  }
}
