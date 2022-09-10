
import mongoose from "mongoose";

export const dbConnection = async () => {
    const cadena = process.env.MONGODB_CNN!;
    
    try {
       await mongoose.connect( cadena );
        console.log('Database Online')
    } catch (error) {
        console.log( error );
        throw new Error('Error connecting database');
        
    }

}

