const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const usersRouter = require("./routes/users");
app.use(express.json());

const PORT = 5500;
const mongodbUrl = "mongodb+srv://crud:crud@cluster0.fmousch.mongodb.net/";
app.use(cors());
app.use('/users', usersRouter);

mongoose.connect(mongodbUrl)
     .then(() => {
          console.log('Connected to MongoDB');
          app.listen(PORT, () => {
               console.log(`Server is running on http://localhost:${PORT}`);
          });
     })
     .catch((err) => {
          console.error('Error connecting to MongoDB:', err);
     });
