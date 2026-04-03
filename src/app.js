const express = require('express');
const cors = require('cors');

const noteRouter = require('./routes/noteRoutes');
const authRouter = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/notes', noteRouter);
app.use('/auth', authRouter);
app.use(errorMiddleware);


module.exports = app;