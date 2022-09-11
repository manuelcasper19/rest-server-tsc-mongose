import { Schema, model, now } from "mongoose";
import usersModel from "./users.model";

const categoriaSchema = new Schema(
    {
        nombre: {
            type: String,
            unique: true,
            require: [ true, 'El nombre de la categoria es necesasrio']
        },
        estado : {
            type: Boolean,
            default: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        fechaCreacion: {
            type: Date,
            default: now()
        }
    }
)

//esto lo hacemos para extraer la "_v y _id de mongo de la respuesta"
categoriaSchema.methods.toJSON = function() {
    const { __v, password, _id, ...categoria } = this.toObject();
    categoria.id = _id;
    return categoria;
}

export default  model('Categoria',categoriaSchema)