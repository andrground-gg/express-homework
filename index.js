const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

const hbs = exphbs.create({ //насройка конфигурации для будущего шаблонизатора
    defaultLayout: 'main', //название дефолтного лэйаута
    extname: 'hbs', //меняем дефолтное расширение
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine); //регистрируем движок по ключу hbs
app.set('view engine', 'hbs'); //используем движок по имени hbs
app.set('views', 'views'); //регистрируем папку где хранятся страницы

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); // express теперь знает, что статика лежит в папке public
app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log("Server has been started");
        });
    } catch(e) {
        console.log(e);
    }
}
start();