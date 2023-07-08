const express = require('express');
const mongoose = require('mongoose');
const app = express();
const usersRouter = require("./routes/users");
app.use(express.json());
require('dotenv').config();


const PORT = 5500;
const mongodbUrl = "mongodb+srv://crud:crud@cluster0.fmousch.mongodb.net/";
app.use('/users', usersRouter);

mongoose.connect(mongodbUrl, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
})
     .then(() => {
          console.log('Connected to MongoDB');
          app.listen(PORT, () => {
               console.log(`Server is running on http://localhost:${PORT}`);
          });
     })
     .catch((err) => {
          console.error('Error connecting to MongoDB:', err);
     });
