"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoria_controller_1 = require("../controller/categoria.controller");
const validarDB_1 = require("../helpers/validarDB");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
//ruta que crea la categoria del product
router.post('/crear', [
    validarJWT_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre de la categoria es necesario').not().isEmpty(),
    (0, express_validator_1.check)('nombre').custom(validarDB_1.validarCategoriaExiste),
    validarCampos_1.validarCampos
], categoria_controller_1.crearCategoria);
//ruta que obtiene todas la categorias en bd
router.get('/', categoria_controller_1.obtenerCategorias);
//ruta que actualiza la categoria,, solo el rol admin y ventas role lo pueden hacer
router.put('/actualizar/:id', [
    validarJWT_1.validarJWT,
    (0, validarCampos_1.tieneRoleEstablecido)('ADMIN_ROLE', 'VENTAS_ROLE'),
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(validarDB_1.validarCategoriaExisteID),
    (0, express_validator_1.check)('nombre', 'El nombre de la categoria es necesario').not().isEmpty(),
    (0, express_validator_1.check)('nombre').custom(validarDB_1.validarCategoriaExiste),
    validarCampos_1.validarCampos
], categoria_controller_1.actualizarCategoria);
//ruta que elimina una categoria, solo el admin
router.delete('/eliminar/:id', [
    validarJWT_1.validarJWT,
    validarCampos_1.esAdmin,
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(validarDB_1.validarCategoriaExisteID),
    validarCampos_1.validarCampos
], categoria_controller_1.eliminarCategoria);
exports.default = router;
//# sourceMappingURL=categoria.routes.js.map