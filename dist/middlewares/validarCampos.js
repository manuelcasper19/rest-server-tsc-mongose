"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdmin = exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    //validamos si el req tiene errores con el objeto validationResult
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(401).json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
const esAdmin = (req, res, next) => {
    //Verificamos que haya un usuario en el request
    if (!req.usuario) {
        return res.status(401).json({
            msg: 'Se requiere verificar el JWT primero y luego el rol'
        });
    }
    const { rol, name } = req.usuario;
    //verificamos que el rol sea admini
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario: ${name} no es un administrador`
        });
    }
    next();
};
exports.esAdmin = esAdmin;
//# sourceMappingURL=validarCampos.js.map