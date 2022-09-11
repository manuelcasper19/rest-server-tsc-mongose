import express  from "express";
import cors from "cors"

import router from "../routes/users.routes";
import routerAuth from "../routes/auth.routes";
import routerCategoria from "../routes/categoria.routes";
import { dbConnection } from "../db/config";

class Server {
    private app : express.Application;
    private port: string;
    private path = {
        auth: '/api/auth',
        categoria: '/api/categorias',
        user: '/api/users'
    }

    constructor() {
        //creamos la instancia de express
        this.app = express();

        //asignamos puerto desde las variables de entorno
        this.port = process.env.PORT || '8099'

        //conectamos a la bd
        this.connection();

        //llamamos los middlewares antes de las rutas
        this.middlewares();

        //entramos a las rutas
        this.routes();
    }

    private async connection(){
       try {
        await dbConnection();
       
       } catch (error) {
        console.log( error );
        throw new Error("could not connect to DB");
       }
    }

    private middlewares(){
        //cors para revisar los equipos de donde se hace la petición
        this.app.use( cors() );

        //Para leer los datos que vienen del body
        this.app.use( express.json() );

        //Contenido estatico
        this.app.use( express.static('public') );
    }

    private routes(){
        this.app.use( this.path.user, router );
        this.app.use( this.path.auth, routerAuth );
        this.app.use( this.path.categoria, routerCategoria );
    }

    public listen(){
         this.app.listen( this.port,  () => {
            console.log(`Server running in the port: ${ this.port }`);
        })
    }

}


export default Server;