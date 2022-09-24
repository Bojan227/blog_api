const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  secure: true,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: 'boki2435',
});

// config env
require('dotenv').config();

// routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
    console.log('Connected to DB');
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;