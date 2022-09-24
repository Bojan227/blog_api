const express = require('express');
const app = express();
const mongoose = require('mongoose');

// config env
require('dotenv').config();

// routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


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