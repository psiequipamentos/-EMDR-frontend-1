import React from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Cadastro from './pages/cadastroPsicologo/cadastro';
import Emdr from './pages/emdr/emdr';
import Prejoin from './pages/emdr/prejoin';
import HomePage from './pages/home';
import Login from './pages/loginPsicologo/login';

function RouterComponent() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='home' element={<HomePage />}> </Route>
          <Route path='cadastro' element={<Cadastro />}> </Route>
          <Route path='login' element={<Login />}> </Route>
          <Route path='prejoin' element={<Prejoin />}> </Route>
          <Route path="emdr/psicologo" element={<Emdr ControlsVisibility={true} />}></Route>
          <Route path="emdr/paciente" element={<Emdr ControlsVisibility={false} />}></Route>
        </Routes>    
    </div>
    </BrowserRouter>
  );
}

export default RouterComponent;