import { Request, Response }  from 'express';
import bcryptjs from "bcryptjs";
import User from '../model/bdmongo/users.model';
//controlador que obtiene todos los usuarios
export const getUser = async ( req: Request, res: Response ) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        console.log( limite )
        //consultamos todos los usuarios en la bd que estén activos
        // const [ total, usuarios ] = await Promise.all ([
        //     User.find( query )
        //         .skip( Number( desde ))
        //         .limit( Number())
        // ])
       const users = await User.find( { status: true })
                               .skip( Number( desde ))
                               .limit( Number())
       res.status(201).json({
           total : users.length,
           users
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}

//controlador que crea un usuario en la bd
export const crearUser = async ( req: Request, res: Response ) => {
    try {
        const { name, email, password, rol } = req.body;

        //encriptamos contraseña
        const salt = bcryptjs.genSaltSync(10);
        //User[password] = bcryptjs.hashSync( password, salt )

        const data = {
            name: name.toLowerCase(),
            email,
            password : bcryptjs.hashSync( password, salt ),
            rol: rol.toUpperCase(),
        }  

        //creamos la instancia del modelo User
        const user = new User( data);

        //guardamos en la bd
        await user.save();
        res.status(201).json( user );
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}

//controlador que actualiza un user
export const actualizarUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { name, rol } = req.body;

        const datosnuevos = {
            name,
            rol: rol.toUpperCase()
        }

        //buscamos el id de usuario y lo actualizamos
        const userActualizado = await User.findByIdAndUpdate( id, datosnuevos, { new: true } );

        res.status(401).json(userActualizado);
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}

//contralodor que elimina un user de forma logica
export const borrarUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const userBorrado = await User.findByIdAndUpdate( id, { status: false }, { new: true })
        res.status(401).json( userBorrado );
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}