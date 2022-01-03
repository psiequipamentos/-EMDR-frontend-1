import React from 'react'
import InputCustom from '../../../components/inputs/input-custom'

export default class RecuperarSenha extends React.Component{
    render(): React.ReactNode {
        return(
            <div className='min-h-screen w-full p-10 bg-gray-50 grid items-center'>
                <form className='lg:w-1/2 lg:mx-auto'>
                    <InputCustom type='text' name='recuperarSenha' label="Código de recuperação" placeholder='Código de recuperação'></InputCustom>
                </form>
            </div>
        )
    }
}