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
app.use(express.json());
const User = require('./User');

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
app.get('/principal', authenticate, servePage('principal.html'));

// Middleware de autenticación
function authenticate(req, res, next) {
  if (!req.session.user) return res.redirect('/');
  next();
}

// Login
app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  try{
    const user = await User.findOne({ correo: username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    req.session.user = { id: user._id, username: user.username };
    res.status(200).json({ message: 'Login exitoso', redirect: '/principal' });

  }catch (err){
    res.status(500).json({message: 'error en el servidor'})
  }

});

// Registro
app.post('/registro', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!/^[A-Za-z]+$/.test(username) || password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener 8 caracteres' });
    }
    if (await User.findOne({ username: username })) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await new User({ username: username, correo: email, password: hashedPassword }).save();
    res.status(200).json({ message: 'Usuario registrado correctamente', redirect: '/' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }

});

// Logout
app.post('/logout', (req, res) => {

});


// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));