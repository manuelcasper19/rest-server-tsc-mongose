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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../model/bdmongo/users.model"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    let esjwtValido = false;
    //validamos que exista un token vigente
    if (!token) {
        return res.status(401).json({
            msg: 'No existe un token en la petición'
        });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY || '', (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(401).json({
                    msg: 'token invalido'
                });
            }
            else {
                const { uid } = jsonwebtoken_1.default.decode(token);
                //const { uid } = decodeToken;    
                const usuario = yield users_model_1.default.findById(uid);
                if (!usuario || !usuario.status) {
                    return res.status(401).json({
                        msg: 'no existe un token valido, usuario'
                    });
                }
                req.usuario = {
                    uid: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    rol: usuario.rol
                };
                next();
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno, comuniquese con el administrador'
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validarJWT.js.map