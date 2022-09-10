import { Schema, model } from "mongoose";

const userSchema = new Schema( 
    {
        name : {
            type: String,
            required : [ true, 'El nombre es obligatorio']
        },
        email : {
            type: String,
            required : [ true, 'El email es obligatorio'],
            unique: true
        },
        password : {
            type: String,
            required : [ true, 'El password es obligatorio'],
           
        },
        img : {
            type: String,   
        
        },
        rol : {
            type: String,   
            required : true,
            emun: ['ADMIN_ROLE', 'USER_ROLE']
        },
        status : {
            type: Boolean,   
            default: true
        
        },
        
        google : {
            type: Boolean,   
            default: false
        
        }
    }
)

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model( 'User', userSchema );