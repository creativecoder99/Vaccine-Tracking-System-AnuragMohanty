const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { initNotificationService } = require('./services/notificationService');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Initialize Notifications
initNotificationService();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/children', require('./routes/childRoutes'));
app.use('/api/vaccines', require('./routes/vaccineRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/schools', require('./routes/schoolRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const { errorHandler } = require('./middlewares/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
