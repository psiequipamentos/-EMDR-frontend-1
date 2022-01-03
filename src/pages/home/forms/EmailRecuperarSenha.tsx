import React from 'react'
import InputCustom from '../../../components/inputs/input-custom'

export default class EmailRecuperarSenha extends React.Component{
    render(): React.ReactNode {
        return(
            <div className='min-h-screen w-full p-10 bg-gray-50 grid items-center'>
                <form className='lg:w-1/2 lg:mx-auto'>
                    <InputCustom type='email' name='recuperarSenha' label="Digite o email para qual encaminharemos o código de recuperação" placeholder='Email de recuperação'></InputCustom>
                    <button className="w-full lg:mt-5 mt-2 text-white font-light text-xl p-3 bg-blue-500 rounded hover:bg-blue-600 hover:shadow-xl">
                        Enviar código para o email
                    </button>
                </form>
            </div>
        )
    }
}