import React from 'react'
import InputCustom from '../../../components/inputs/input-custom'

export default class TrocarSenha extends React.Component{
    render(): React.ReactNode {
        return(
            <div className='min-h-screen w-full p-10 bg-gray-50 grid items-center'>
                <form className='lg:w-1/2 lg:mx-auto'>
                    <InputCustom type='password' name='senha' label="Digite uma nova senha" placeholder='Senha'></InputCustom>
                    <InputCustom type='password' name='repetirSenha' label="Repetir senha" placeholder='Repetir senha'></InputCustom>
                    <button className="w-full lg:mt-5 mt-2 text-white font-light text-xl p-3 bg-yellow-500 rounded hover:bg-yellow-600 hover:shadow-xl">
                        Salvar nova senha
                    </button>
                </form>
            </div>
        )
    }
}