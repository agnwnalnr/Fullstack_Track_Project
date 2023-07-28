const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');

const app = express();
const PORT_MONGO = process.env.PORT || 5000;
const PORT_SERVER = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/FullStackProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT_MONGO, () => {
      console.log(`Mongo is running on port ${PORT_MONGO}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api', apiRouter);

app.listen(PORT_SERVER, () => {
  console.log(`Server is running on port ${PORT_SERVER}`);
});
