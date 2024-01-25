const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const routes = require('./routes');

const app = express();
const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

app.use(routes);

app.listen(port, () => console.log(`Server is working on port ${port}...`));