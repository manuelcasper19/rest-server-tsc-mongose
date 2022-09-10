import { Router } from "express";
import { check } from "express-validator";
import { actualizarUser, borrarUser, crearUser, getUser } from '../controller/user.controller';
import { validarEmailExiste, validarRolExiste, validarUsuaioExiste } from "../helpers/validarDB";
import { validarCampos, esAdmin } from '../middlewares/validarCampos';
import { validarJWT } from "../middlewares/validarJWT";


const router = Router();

//routa que obtiene todos los usuarios
router.get('/', getUser );

//ruta que crea un usuario
router.post('/crear', [
    check('name', 'El nombre del usuario es necesario').not().isEmpty(),
    check('email', 'El email del usuario es necesario').isEmail(),
    check('email').custom( validarEmailExiste ),
    check('password', 'El password debe tener minimo 6 caracteres').isLength( { min: 6 }),
    check('rol').custom( validarRolExiste ),
    validarCampos
], crearUser );

//ruta que actualiza un usuario
router.put('/actualizar/:id',[
    validarJWT,
    esAdmin,
    check('id', 'No es un id de usuario correcto').isMongoId(),
    check('id').custom( validarUsuaioExiste),
    check('name', 'El nombre del usuario es necesario').not().isEmpty(),
    check('rol').custom( validarRolExiste ),
    validarCampos
], actualizarUser );

//ruta que borra un usuario, solo admin
router.delete('/borrar/:id', [
    validarJWT,
    esAdmin,
    check('id', 'No es un id de usuario correcto').isMongoId(),
    check('id').custom( validarUsuaioExiste),
    validarCampos
], borrarUser );


export default router;