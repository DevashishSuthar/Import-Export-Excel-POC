const express = require('express');
const cors = require('cors');

// local imports
const { PORT } = require('./configs/env.config');


// create instance of express server
const app = express();

// use middlewares
app.use(cors());

app.use(require('./routes/index.route'));

app.get('/', (req, res, next) => {
    res.send('Server is up and running!');
});

// start express server
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});