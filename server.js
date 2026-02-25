/* ============================================
   BUILDEASY — Express Server Entry Point
   ============================================ */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* -------- MIDDLEWARE -------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (optional — for full-stack dev)
app.use(express.static('../'));

/* -------- ROUTES -------- */
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const materialRoutes = require('./routes/materialRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const gpsRoutes = require('./routes/gpsRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/gps', gpsRoutes);
app.use('/api/admin', adminRoutes);

/* -------- HEALTH CHECK -------- */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'BuildEasy API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        database: 'MongoDB Atlas',
    });
});

/* -------- 404 HANDLER -------- */
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

/* -------- ERROR HANDLER -------- */
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

/* -------- CONNECT DB & START SERVER -------- */
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🏗️  BuildEasy API Server`);
        console.log(`   ➜ Running on http://localhost:${PORT}`);
        console.log(`   ➜ Health check: http://localhost:${PORT}/api/health`);
        console.log(`   ➜ Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
});
