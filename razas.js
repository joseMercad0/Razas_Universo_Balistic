const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Conectar a MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Se ha conectado correctamente a MongoDB');
}).catch((error) => {
  console.log('Error al conectarse a la base de datos:', error);
});

// Configurar Express para manejar las solicitudes POST
app.use(express.urlencoded({ extended: true }));

// Definir un modelo para la colección de razas
const Raza = mongoose.model('razas', {
  nombre: String,
  tipo: String,
  descripcion: String
});

// Manejar la solicitud GET para mostrar el formulario de ingreso de datos
app.get('/', (req, res) => {
  res.render('formulario');
});

// Manejar la solicitud POST para almacenar los datos en la base de datos
app.post('/', (req, res) => {
  const { nombre, tipo, descripcion } = req.body;
  const raza = new Raza({ nombre, tipo, descripcion });
  raza.save().then(() => {
    res.redirect('/');
  }).catch((error) => {
    console.log('Error al guardar la raza:', error);
    res.redirect('/');
  });
});

// Manejar la solicitud GET para mostrar las razas almacenadas en la base de datos
app.get('/razas', (req, res) => {
  Raza.find().then((razas) => {
    res.render('razas', { razas });
  }).catch((error) => {
    console.log('Error al obtener las razas:', error);
    res.render('razas', { razas: [] });
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
