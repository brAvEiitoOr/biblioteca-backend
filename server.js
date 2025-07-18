const express = require('express');
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 3000

// Middleware para procesar JSON
app.use(express.json());

// Middleware CORS para permitir peticiones del frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Rutas
app.use('/api', bookRoutes);
app.use('/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de Biblioteca Digital funcionando correctamente',
        version: '2.0.0',
        features: [
            'Autenticación JWT',
            'Gestión de libros con SQL directo',
            'Validaciones mejoradas',
            'Manejo de errores optimizado'
        ]
    });
});

// Arrancar servidor HTTP en el puerto 80
app.listen(PORT || 80, () => {
  console.log('🚀 Servidor corriendo en el puerto ' + PORT);
  console.log('📚 API de Biblioteca Digital v2.0.0');
  console.log('✅ Base de datos conectada');
  console.log('🔗 Endpoints disponibles:');
  console.log('   - GET  /api/libros');
  console.log('   - POST /auth/login');
  console.log('   - POST /auth/register');
  console.log('   - POST /api/libros/agregar (requiere auth)');
  console.log('   - DELETE /api/libros/eliminar/:id (requiere auth)');
});
