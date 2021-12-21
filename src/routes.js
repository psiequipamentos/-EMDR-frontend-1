import React from 'react';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import Timer from './components/timer/timer';
import PsicologoMiddleware from './middleware/psicologo.middleware';
import Cadastro from './pages/cadastroPsicologo/cadastro';
import ChamadaEncerrada from './pages/chamadaEncerrada/chamadaEncerrada';
import Emdr from './pages/emdr/emdr';
import Prejoin from './pages/emdr/prejoin';
import HomePage from './pages/home';
import EditPaciente from './pages/home/forms/editPaciente';
import Login from './pages/loginPsicologo/login';

const PsiMiddleware = new PsicologoMiddleware();

function RouterComponent() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes> 
        {console.log(PsiMiddleware.autenticar())}
        <Route path='timer' element={<Timer />}> </Route>
        <Route path='chamada-encerrada' element={<ChamadaEncerrada />}> </Route>

          <Route path='home' element={PsiMiddleware.autenticar() ? <HomePage /> : <Navigate to="/login" />}> </Route>
          <Route path='editar-paciente/:id' element={PsiMiddleware.autenticar() ? <EditPaciente /> : <Navigate to="/login" />}> </Route>
          <Route path='cadastro' element={PsiMiddleware.autenticar() ? <Cadastro /> : <Navigate to="/login" />}> </Route>
          <Route path='login' element={<Login />}> </Route>
          <Route path='prejoin/:meeting_id' element={PsiMiddleware.autenticar() ? <Prejoin /> : <Navigate to="/login" />}> </Route>
          <Route path="emdr/psicologo/:meeting_code" element={PsiMiddleware.autenticar() ? <Emdr ControlsVisibility={true} /> : <Navigate to="/login" />}></Route>

          <Route path="emdr/psicologo/" element={<Emdr ControlsVisibility={true} /> }></Route>
            <Route path="chamada-encerrada" element={<ChamadaEncerrada/> }></Route>
          <Route path="emdr/paciente/:meeting_code" element={PsiMiddleware.autenticar() ? <Emdr ControlsVisibility={false} /> : <Navigate to="/login" />}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default RouterComponent;
