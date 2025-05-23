require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Trust proxy for secure cookies over HTTPS (Required for Render)
app.set('trust proxy', 1);

// ✅ Security Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          "https://cdnjs.cloudflare.com",
          "https://maps.googleapis.com",
          "'unsafe-inline'" 
        ],
        "script-src-attr": ["'unsafe-inline'"], 
        "style-src": [
          "'self'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "'unsafe-inline'"
        ],
        "font-src": [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com"
        ],
        "img-src": ["'self'", "data:"],
        "frame-src": [
          "https://www.google.com",
          "https://maps.google.com"
        ],
        "connect-src": [
          "'self'",
          process.env.FRONTEND_ORIGIN || "",
           "https://script.google.com",
           "https://script.googleusercontent.com"
        ]
      }
    }
  })
);

app.use(compression());

// ✅ CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN, // e.g., https://your-frontend.com
  credentials: true // Enable sending cookies
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ✅ Session configuration (cross-origin compatible)
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true on Render
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ✅ Routes
const eventsRouter = require('../routes/events');
const adminRouter = require('../routes/admin');

app.use('/api/events', eventsRouter);
app.use('/api/admin', adminRouter);

// ✅ 404 handler
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
