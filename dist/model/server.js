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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const config_1 = require("../db/config");
class Server {
    constructor() {
        this.path = {
            auth: '/api/auth',
            user: '/api/users'
        };
        //creamos la instancia de express
        this.app = (0, express_1.default)();
        //asignamos puerto desde las variables de entorno
        this.port = process.env.PORT || '8099';
        //conectamos a la bd
        this.connection();
        //llamamos los middlewares antes de las rutas
        this.middlewares();
        //entramos a las rutas
        this.routes();
    }
    connection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, config_1.dbConnection)();
            }
            catch (error) {
                console.log(error);
                throw new Error("could not connect to DB");
            }
        });
    }
    middlewares() {
        //cors para revisar los equipos de donde se hace la petición
        this.app.use((0, cors_1.default)());
        //Para leer los datos que vienen del body
        this.app.use(express_1.default.json());
        //Contenido estatico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.path.user, users_routes_1.default);
        this.app.use(this.path.auth, auth_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in the port: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map