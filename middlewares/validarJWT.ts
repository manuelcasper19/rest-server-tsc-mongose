import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response }  from 'express';

import User from '../model/bdmongo/users.model';

declare module 'express' {
    interface Request {
        usuario?: {
            uid?: string,
            name: string,
            email: string,
            rol: string
        };
    }
}
export const validarJWT = async(req: Request, res: Response, next : NextFunction ) => {
        const token = req.header('x-token');
        let esjwtValido = false;
        //validamos que exista un token vigente
        if( !token ){
            return res.status(401).json({
                msg: 'No existe un token en la petición'
            })
        }

        try {
            jwt.verify( token, process.env.SECRETORPRIVATEKEY || '', async (err) => {
                if(err){
                   return res.status(401).json({
                    msg: 'token invalido'
                    });
                    
                }else{
                    const { uid } = jwt.decode( token ) as { uid: string };
                    //const { uid } = decodeToken;    
                    const usuario = await User.findById( uid );    
                    if( !usuario || !usuario.status ){
                        return res.status(401).json({
                            msg: 'no existe un token valido, usuario'
                        });
                    }  
                   
                    req.usuario = {
                        uid: usuario.id,
                        name: usuario.name,
                        email: usuario.email,
                        rol: usuario.rol
                    }   
                           
                    next();
                }
              

            })   
            
        } catch (error) {
            console.log( error )
            res.status(500).json({
                msg: 'Error interno, comuniquese con el administrador'
            })
        }
}