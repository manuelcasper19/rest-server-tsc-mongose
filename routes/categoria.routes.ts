import { Router } from "express";
import { check } from "express-validator";

import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategorias } from "../controller/categoria.controller";
import { validarCategoriaExiste, validarCategoriaExisteID } from "../helpers/validarDB";
import { esAdmin, tieneRoleEstablecido, validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

//ruta que crea la categoria del product
router.post('/crear', [
    validarJWT,
    check('nombre', 'El nombre de la categoria es necesario').not().isEmpty(),
    check('nombre').custom( validarCategoriaExiste ),
    validarCampos
], crearCategoria)

//ruta que obtiene todas la categorias en bd
router.get('/', obtenerCategorias );

//ruta que actualiza la categoria,, solo el rol admin y ventas role lo pueden hacer
router.put('/actualizar/:id', [
    validarJWT,
    tieneRoleEstablecido('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( validarCategoriaExisteID ),
    check('nombre', 'El nombre de la categoria es necesario').not().isEmpty(),
    check('nombre').custom( validarCategoriaExiste ),
    validarCampos
], actualizarCategoria );


//ruta que elimina una categoria, solo el admin
router.delete('/eliminar/:id',[
    validarJWT,
    esAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( validarCategoriaExisteID ),
    validarCampos
], eliminarCategoria)

export default router;