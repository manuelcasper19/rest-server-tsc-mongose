"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const users_model_1 = __importDefault(require("../model/bdmongo/users.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //buscamos el email en la bd
        const userlogin = yield users_model_1.default.findOne({ email });
        if (!userlogin) {
            return res.status(401).json({
                msg: 'Error de inicio de sesión, email'
            });
        }
        if (!userlogin.status) {
            return res.status(401).json({
                msg: 'Error de inicio de sesión, inactivo'
            });
        }
        //verificamos que los password sean correctos
        const verificarpassword = bcryptjs_1.default.compareSync(password, userlogin.password);
        if (!verificarpassword) {
            return res.status(401).json({
                msg: 'Error de inicio de sesión, password'
            });
        }
        //ahora le generamos el JWT
        const token = yield (0, jwt_1.generarJWT)(userlogin.id);
        res.status(201).json({
            userlogin,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map