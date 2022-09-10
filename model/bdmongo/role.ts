import { Schema, model } from "mongoose";

const roleSchema = new Schema(
    {
        rol: {
            type: String,
            require: [true, 'Es necesario el rol']
        }
    }
);

export default model('Rol', roleSchema );