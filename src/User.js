const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  correo: {
    type: String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  Ingresos: [{
    cantidad: Number,
    fecha: Date,
    categoria: String
  }],
  Gastos: [{
    cantidad: Number,
    fecha: Date,
    categoria: String
  }]
});

// No es necesario el pre-save para encriptar la contraseña

// Crear el modelo User usando el esquema
const User = mongoose.model('User', userSchema);

module.exports = User; // Exportamos el modelo para usarlo en otros archivos