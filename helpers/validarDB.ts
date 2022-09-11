
import User from '../model/bdmongo/users.model';
import Rol from '../model/bdmongo/role';
import Categoria from '../model/bdmongo/categoria.model';



export const validarEmailExiste = async ( email: string = '' ) => {
       //validamos que el email no exista
       const emailExiste = await User.findOne( { email: email.toLowerCase() });

       if( emailExiste ){
        throw new Error(`el email: ${ email }, ya está registrado`);
        
       }
}

export const validarRolExiste =  async (rol: string = '') => {
 
    const existeRol = await Rol.findOne( { rol: rol.toUpperCase() });
    console.log( existeRol )
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

export const validarCategoriaExiste =  async (nombre: string = '') => {
    const existeCategoria = await Categoria.find( { nombre : nombre.toUpperCase(), status: true });
  
    if( existeCategoria.length > 0 ){
        throw new Error(`La Categoria con nombre: ${ nombre }, ya existe en la BD`)
    }
}

export const validarCategoriaExisteID =  async (id: string = '') => {
    const existeCategoriaId = await Categoria.findById( id );
  
    if( !existeCategoriaId){
        throw new Error(`La Categoria con id: ${ id }, no existe en la BD`)
    }
}