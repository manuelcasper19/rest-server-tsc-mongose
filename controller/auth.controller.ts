import { Request, Response }  from 'express';
import User from '../model/bdmongo/users.model';
import bcryptjs from "bcryptjs";
import { generarJWT } from '../helpers/jwt';

export const login = async ( req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;
        //buscamos el email en la bd
        const userlogin = await User.findOne( {email})
        if( !userlogin ){
            return res.status(401).json({
                msg: 'Error de inicio de sesión, email'
            })
        }

        if( !userlogin.status ){
            return res.status(401).json({
                msg: 'Error de inicio de sesión, inactivo'
            })
        }
        //verificamos que los password sean correctos

        const verificarpassword = bcryptjs.compareSync( password, userlogin.password );
        if( !verificarpassword ){
            return res.status(401).json({
                msg: 'Error de inicio de sesión, password'
            })
        }

        //ahora le generamos el JWT
        const token = await generarJWT( userlogin.id );

       res.status(201).json({
           userlogin,
           token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        })
    }

}
