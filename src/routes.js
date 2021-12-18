import React from 'react';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import PsicologoMiddleware from './middleware/psicologo.middleware';
import Cadastro from './pages/cadastroPsicologo/cadastro';
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
          <Route path='home' element={PsiMiddleware.autenticar() ? <HomePage /> : <Navigate to="/login" />}> </Route>
          <Route path='editar-paciente/:id' element={PsiMiddleware.autenticar() ? <EditPaciente /> : <Navigate to="/login" />}> </Route>
          <Route path='cadastro' element={PsiMiddleware.autenticar() ? <Cadastro /> : <Navigate to="/login" />}> </Route>
          <Route path='login' element={<Login />}> </Route>
          <Route path='prejoin/:meeting_id' element={PsiMiddleware.autenticar() ? <Prejoin /> : <Navigate to="/login" />}> </Route>
          <Route path="emdr/psicologo/:meeting_code" element={PsiMiddleware.autenticar() ? <Emdr ControlsVisibility={true} /> : <Navigate to="/login" />}></Route>
          <Route path="emdr/paciente/:meeting_code" element={PsiMiddleware.autenticar() ? <Emdr ControlsVisibility={false} /> : <Navigate to="/login" />}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default RouterComponent;
