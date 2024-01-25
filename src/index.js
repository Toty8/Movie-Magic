const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.get('/about', (req, res) => {
    res.render('about', {layout: false})
});

app.listen(port, () => console.log(`Server is working on port ${port}...`));