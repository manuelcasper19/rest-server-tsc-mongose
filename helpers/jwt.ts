import jwt from "jsonwebtoken";

export const generarJWT = (uid: string )=> {
    return new Promise( (resolve, reject )=> {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '2h'
        }, (err, token) => {
            if( err){
                console.log( err );
                reject('Hubo un error al crear el token')
            }else{
                resolve( token );
            }
        })
    })
}