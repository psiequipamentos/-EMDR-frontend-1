import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GuardedRoute, GuardProvider } from "react-router-guards";
import Timer from "./components/timer/timer";
import PsicologoMiddleware from "./middleware/psicologo.middleware";
import Cadastro from "./pages/cadastroPsicologo/cadastro";
import ChamadaEncerrada from "./pages/chamadaEncerrada/chamadaEncerrada";
import Emdr from "./pages/emdr/emdr";
import Prejoin from "./pages/emdr/prejoin";
import HomePage from "./pages/home";
import EditPaciente from "./pages/home/forms/editPaciente";
import EmailRecuperarSenha from "./pages/home/forms/EmailRecuperarSenha";
import RecuperarSenha from "./pages/home/forms/recuperarSenha";
import TrocarSenha from "./pages/home/forms/trocarsenha";
import Login from "./pages/loginPsicologo/login";
import ValidarPsicologo from "./pages/ValidarPsicologo";

const PsiMiddleware = new PsicologoMiddleware();

const Routes = () => (
  <BrowserRouter>
    <GuardProvider guards={[PsiMiddleware.autenticar]}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/recuperar-senha/digitar-codigo" component={RecuperarSenha} />
        <Route path="/recuperar-senha/digitar-email" component={EmailRecuperarSenha} />
        <Route path="/recuperar-senha/nova-senha" component={TrocarSenha} />
        <Route path="/emdr/paciente/:meeting_code">
          <Emdr ControlsVisibility={false}></Emdr>
        </Route>
        <Route path="/verificar-email/:id" component={ValidarPsicologo}/>
        <Route path="/cadastro" component={Cadastro}/>
        {/* HOME */}
        <GuardedRoute
          path="/home"
          meta={{ auth: true, router_type: "psicologo" }}
        >
          <HomePage></HomePage>
        </GuardedRoute>

        {/* TIMER */}
        <GuardedRoute
          path="/timer"
          meta={{ auth: true, router_type: "psicologo" }}
        >
          <Timer></Timer>
        </GuardedRoute>

        {/* CHAMADA ENCERRADA */}
        <GuardedRoute
          path="/chamada-encerrada"
          meta={{ auth: true, router_type: "psicologo" }}
        >
          <ChamadaEncerrada></ChamadaEncerrada>
        </GuardedRoute>

        {/* EDITAR PACIENTE */}
        <GuardedRoute
          path="/editar-paciente/:id"
          meta={{ auth: true, router_type: "psicologo" }}
        >
          <EditPaciente></EditPaciente>
        </GuardedRoute>

        {/* PREJOIN */}
        <GuardedRoute
          path="/prejoin/:meeting_id"
          meta={{ auth: true, router_type: "psicologo" }}
        >
          <Prejoin></Prejoin>
        </GuardedRoute>

        {/* EMDR PSICOLOGO */}
        <GuardedRoute
          path="/emdr/psicologo/"
          meta={{ auth: true, router_type: "psicologo" }}
        >
          <Emdr ControlsVisibility={true}></Emdr>
        </GuardedRoute>

        
      </Switch>
    </GuardProvider>
  </BrowserRouter>
);

export default Routes;
