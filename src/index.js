// Importaciones necesarias
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fetch = require('node-fetch');

// Configuración de la aplicación
const app = express();
const PORT = process.env.PORT || 3001;

// Variables de entorno
const mongoURI = process.env.MONGO_URI;


// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => console.log('Conectado a la base de datos'));
mongoose.connection.on('error', (err) => console.error('❌ Error conectando a MongoDB:', err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas estáticas
const servePage = (file) => (req, res) => res.sendFile(path.join(__dirname, '../public', file));

// Middleware de autenticación
function authenticate(req, res, next) {
  if (!req.session.user) return res.redirect('/');
  next();
}

// Login
app.post('/login', async (req, res) => {
  
});

// Registro
app.post('/registro', async (req, res) => {

});

// Logout
app.post('/logout', (req, res) => {

});


// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));