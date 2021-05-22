const mongoose = require('mongoose'); 

const dbConnection= async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            //para utilizar ciertas funciones de mongo debo inicializar lo sgte
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('bases de datos online');
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos');
    }
}


module.exports = {
    dbConnection
}
    


