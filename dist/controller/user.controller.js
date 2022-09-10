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
exports.borrarUser = exports.actualizarUser = exports.crearUser = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_model_1 = __importDefault(require("../model/bdmongo/users.model"));
//controlador que obtiene todos los usuarios
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limite = 5, desde = 0 } = req.query;
        console.log(limite);
        //consultamos todos los usuarios en la bd que estén activos
        // const [ total, usuarios ] = await Promise.all ([
        //     User.find( query )
        //         .skip( Number( desde ))
        //         .limit( Number())
        // ])
        const users = yield users_model_1.default.find({ status: true })
            .skip(Number(desde))
            .limit(Number());
        res.status(201).json({
            total: users.length,
            users
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.getUser = getUser;
//controlador que crea un usuario en la bd
const crearUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, rol } = req.body;
        //encriptamos contraseña
        const salt = bcryptjs_1.default.genSaltSync(10);
        //User[password] = bcryptjs.hashSync( password, salt )
        const data = {
            name: name.toLowerCase(),
            email,
            password: bcryptjs_1.default.hashSync(password, salt),
            rol: rol.toUpperCase(),
        };
        //creamos la instancia del modelo User
        const user = new users_model_1.default(data);
        //guardamos en la bd
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.crearUser = crearUser;
//controlador que actualiza un user
const actualizarUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, rol } = req.body;
        const datosnuevos = {
            name,
            rol: rol.toUpperCase()
        };
        //buscamos el id de usuario y lo actualizamos
        const userActualizado = yield users_model_1.default.findByIdAndUpdate(id, datosnuevos, { new: true });
        res.status(401).json(userActualizado);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.actualizarUser = actualizarUser;
//contralodor que elimina un user de forma logica
const borrarUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userBorrado = yield users_model_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
        res.status(401).json(userBorrado);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.borrarUser = borrarUser;
//# sourceMappingURL=user.controller.js.map