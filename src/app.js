const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simplecms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 SimpleCMS running on port ${PORT}`);
});

module.exports = app;
