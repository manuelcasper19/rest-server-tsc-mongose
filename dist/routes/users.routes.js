"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controller/user.controller");
const validarDB_1 = require("../helpers/validarDB");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
//routa que obtiene todos los usuarios
router.get('/', user_controller_1.getUser);
//ruta que crea un usuario
router.post('/crear', [
    (0, express_validator_1.check)('name', 'El nombre del usuario es necesario').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email del usuario es necesario').isEmail(),
    (0, express_validator_1.check)('email').custom(validarDB_1.validarEmailExiste),
    (0, express_validator_1.check)('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('rol').custom(validarDB_1.validarRolExiste),
    validarCampos_1.validarCampos
], user_controller_1.crearUser);
//ruta que actualiza un usuario
router.put('/actualizar/:id', [
    validarJWT_1.validarJWT,
    validarCampos_1.esAdmin,
    (0, express_validator_1.check)('id', 'No es un id de usuario correcto').isMongoId(),
    (0, express_validator_1.check)('id').custom(validarDB_1.validarUsuaioExiste),
    (0, express_validator_1.check)('name', 'El nombre del usuario es necesario').not().isEmpty(),
    (0, express_validator_1.check)('rol').custom(validarDB_1.validarRolExiste),
    validarCampos_1.validarCampos
], user_controller_1.actualizarUser);
//ruta que borra un usuario, solo admin
router.delete('/borrar/:id', [
    validarJWT_1.validarJWT,
    validarCampos_1.esAdmin,
    (0, express_validator_1.check)('id', 'No es un id de usuario correcto').isMongoId(),
    (0, express_validator_1.check)('id').custom(validarDB_1.validarUsuaioExiste),
    validarCampos_1.validarCampos
], user_controller_1.borrarUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map