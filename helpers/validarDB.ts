
import User from '../model/bdmongo/users.model';
import Rol from '../model/bdmongo/users.model';


export const validarEmailExiste = async ( email: string = '' ) => {
       //validamos que el email no exista
       const emailExiste = await User.findOne( { email: email.toLowerCase() });

       if( emailExiste ){
        throw new Error(`el email: ${ email }, ya está registrado`);
        
       }
}

export const validarRolExiste =  async (rol: string = '') => {
    const existeRol = await Rol.findOne( { rol: rol.toUpperCase() });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta definido en la BD`)
    }
}

export const validarUsuaioExiste =  async (id: string = '') => {
    const existeUsuario = await User.find( { _id: id, status: true });
    if( existeUsuario.length === 0 ){
        throw new Error(`El usuario con id:  ${ id } no esta definido en la BD`)
    }
}