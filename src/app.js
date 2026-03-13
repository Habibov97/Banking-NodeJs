const config = require('./config');
const express = require('express');
require('./database/index');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');
const globalErrorMiddleware = require('./middlewares/globalErrorMiddleware');
const { engine } = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const viewsPath = path.join(__dirname, './views');
app.set('views', viewsPath);

app.get('/', (req, res) => {
  res.render('home', { name: req.query.name });
});

// static path
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

//swagger ui
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

// global error middleware
app.use(globalErrorMiddleware);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
