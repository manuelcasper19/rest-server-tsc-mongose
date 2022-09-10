"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controller/auth.controller");
const validarCampos_1 = require("../middlewares/validarCampos");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El email del usuario es necesario').isEmail(),
    (0, express_validator_1.check)('password', 'Debe ingresar el password').isLength({ min: 1 }),
    validarCampos_1.validarCampos
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map