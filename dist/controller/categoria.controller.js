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
exports.eliminarCategoria = exports.actualizarCategoria = exports.obtenerCategorias = exports.crearCategoria = void 0;
const jwt_1 = require("../helpers/jwt");
const categoria_model_1 = __importDefault(require("../model/bdmongo/categoria.model"));
//controlador que crea la categoria en la bd
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { nombre } = req.body;
        const data = {
            nombre: nombre.toUpperCase(),
            user: (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.uid
        };
        //creamos el modelo categoria en la bd
        const categoria = new categoria_model_1.default(data);
        //guardamos en la bd
        yield categoria.save();
        //renovamos el token
        const token = yield (0, jwt_1.generarJWT)((_b = req.usuario) === null || _b === void 0 ? void 0 : _b.uid);
        res.status(201).json({
            categoria,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.crearCategoria = crearCategoria;
//controlador que obtiene todas las categorias con paginacion
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const categorias = yield categoria_model_1.default.find({ status: true })
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user', 'name');
        res.status(201).json({
            total: categorias.length,
            categorias
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.obtenerCategorias = obtenerCategorias;
//controlador que actualiza un user
const actualizarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const datosnuevos = {
            nombre: nombre.toUpperCase(),
            user: (_c = req.usuario) === null || _c === void 0 ? void 0 : _c.uid
        };
        //buscamos el id de usuario y lo actualizamos
        const categoriaActualizado = yield categoria_model_1.default.findByIdAndUpdate(id, datosnuevos, { new: true });
        //renovamos un jwt
        const token = yield (0, jwt_1.generarJWT)((_d = req.usuario) === null || _d === void 0 ? void 0 : _d.uid);
        res.status(401).json({
            categoriaActualizado,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.actualizarCategoria = actualizarCategoria;
//controlador que elimina una categoria
const eliminarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { id } = req.params;
        //buscamos el id de usuario y lo actualizamos
        const categoriaEliminada = yield categoria_model_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
        //renovamos un jwt
        const token = yield (0, jwt_1.generarJWT)((_e = req.usuario) === null || _e === void 0 ? void 0 : _e.uid);
        res.status(401).json({
            categoriaEliminada,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error, por favor comuniquese con el administrador'
        });
    }
});
exports.eliminarCategoria = eliminarCategoria;
//# sourceMappingURL=categoria.controller.js.map