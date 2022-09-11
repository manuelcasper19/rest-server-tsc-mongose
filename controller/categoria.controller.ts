import { Request, Response }  from 'express';
import { generarJWT } from '../helpers/jwt';

import Categoria from '../model/bdmongo/categoria.model';

//controlador que crea la categoria en la bd
export const crearCategoria = async ( req: Request, res: Response ) => {
    try {
        const { nombre  } = req.body;

        const data = {
            nombre: nombre.toUpperCase(),
            user: req.usuario?.uid
        }
        //creamos el modelo categoria en la bd
        const categoria = new Categoria( data );

        //guardamos en la bd
        await categoria.save();

        //renovamos el token
        const token = await generarJWT( req.usuario?.uid as string )

        res.status(201).json( {
            categoria,
            token
        } );
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}


//controlador que obtiene todas las categorias con paginacion
export const obtenerCategorias = async ( req: Request, res: Response ) => {
    try {
        const { limite = 5, desde = 0 } = req.query;

       const categorias = await Categoria.find( { status: true })
                               .skip( Number( desde ))
                               .limit( Number( limite ))
                               .populate('user', 'name')
       res.status(201).json({
           total : categorias.length,
           categorias
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}

//controlador que actualiza un user
export const actualizarCategoria = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { nombre  } = req.body;
   
        const datosnuevos = {
            nombre: nombre.toUpperCase(),
            user: req.usuario?.uid
        }

        //buscamos el id de usuario y lo actualizamos
        const categoriaActualizado = await Categoria.findByIdAndUpdate( id, datosnuevos, { new: true } );

        //renovamos un jwt
        const token = await generarJWT( req.usuario?.uid as string );

        res.status(401).json({
            categoriaActualizado,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}

//controlador que elimina una categoria
export const eliminarCategoria = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;

        //buscamos el id de usuario y lo actualizamos
        const categoriaEliminada = await Categoria.findByIdAndUpdate( id, { estado: false}, { new: true } );

        //renovamos un jwt
        const token = await generarJWT( req.usuario?.uid as string );

        res.status(401).json({
            categoriaEliminada,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}

