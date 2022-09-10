import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validarCampos = ( req: Request, res: Response, next: NextFunction ) => {

    //validamos si el req tiene errores con el objeto validationResult
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(401).json(errors);
    }

    next();

}


export const esAdmin = ( req: Request, res: Response, next: NextFunction ) => {
    //Verificamos que haya un usuario en el request
    if( !req.usuario ){
        return res.status(401).json({
            msg: 'Se requiere verificar el JWT primero y luego el rol'
        })
    }

    const { rol, name } = req.usuario;

    //verificamos que el rol sea admini
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario: ${ name } no es un administrador`
        })
    }

    next();
}