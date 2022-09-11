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
exports.validarCategoriaExisteID = exports.validarCategoriaExiste = exports.validarUsuaioExiste = exports.validarRolExiste = exports.validarEmailExiste = void 0;
const users_model_1 = __importDefault(require("../model/bdmongo/users.model"));
const role_1 = __importDefault(require("../model/bdmongo/role"));
const categoria_model_1 = __importDefault(require("../model/bdmongo/categoria.model"));
const validarEmailExiste = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    //validamos que el email no exista
    const emailExiste = yield users_model_1.default.findOne({ email: email.toLowerCase() });
    if (emailExiste) {
        throw new Error(`el email: ${email}, ya está registrado`);
    }
});
exports.validarEmailExiste = validarEmailExiste;
const validarRolExiste = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield role_1.default.findOne({ rol: rol.toUpperCase() });
    console.log(existeRol);
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta definido en la BD`);
    }
});
exports.validarRolExiste = validarRolExiste;
const validarUsuaioExiste = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield users_model_1.default.find({ _id: id, status: true });
    if (existeUsuario.length === 0) {
        throw new Error(`El usuario con id:  ${id} no esta definido en la BD`);
    }
});
exports.validarUsuaioExiste = validarUsuaioExiste;
const validarCategoriaExiste = (nombre = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeCategoria = yield categoria_model_1.default.find({ nombre: nombre.toUpperCase(), status: true });
    if (existeCategoria.length > 0) {
        throw new Error(`La Categoria con nombre: ${nombre}, ya existe en la BD`);
    }
});
exports.validarCategoriaExiste = validarCategoriaExiste;
const validarCategoriaExisteID = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeCategoriaId = yield categoria_model_1.default.findById(id);
    if (!existeCategoriaId) {
        throw new Error(`La Categoria con id: ${id}, no existe en la BD`);
    }
});
exports.validarCategoriaExisteID = validarCategoriaExisteID;
//# sourceMappingURL=validarDB.js.map