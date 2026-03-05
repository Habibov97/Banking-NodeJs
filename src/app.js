const config = require('./config');
const express = require('express');
require('./database/index');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');
const globalErrorMiddleware = require('./middlewares/globalErrorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.use(globalErrorMiddleware);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
