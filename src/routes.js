import React from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import InputCustom from './components/inputs/input-custom';
import Chat from './components/chat';
import Dashboard from './components/sidebar/dashboard';
import buttonCustom from './components/buttons/button';
import App from './components/App';
import { Usuario } from './components/sidebar/dummySidebar/dummySidebar';
import Emdr from './pages/emdr/emdr';
import EmdrSounds from './pages/emdr/emdrSounds';


function RouterComponent() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
            <Route path='dashboard' element={<Dashboard currentComponent={buttonCustom} menuItemGroup={Usuario} />}></Route>
            <Route path='input' element={<Dashboard currentComponent={InputCustom} menuItemGroup={Usuario} />}></Route>
            <Route path='chat' element={<Chat/>}></Route>
            <Route path='home' element={<Dashboard currentComponent={App} menuItemGroup={Usuario} />}></Route>
            <Route path="emdr/psicologo" element={<Emdr ControlsVisibility={true} />}></Route>
            <Route path="emdr/paciente" element={<Emdr ControlsVisibility={false} />}></Route>
            <Route path="Sound" element={<EmdrSounds />}></Route>
        </Routes>    
    </div>
    </BrowserRouter>
  );
}

export default RouterComponent;