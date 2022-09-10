import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controller/auth.controller";
import { validarCampos } from "../middlewares/validarCampos";

const router = Router();

router.post('/login', [
    check('email', 'El email del usuario es necesario').isEmail(),    
    check('password', 'Debe ingresar el password').isLength( { min: 1 }),
    validarCampos
], login );

export default router;